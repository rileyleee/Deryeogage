package com.kkosunnae.deryeogage.global.s3file;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3FileService {
    private final AmazonS3 amazonS3;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public Map<String, List> uploadFile(List<MultipartFile> multipartFile) { //DTO에 반영필요...
        Map<String, List> nameList = new HashMap<>();

        List<String> savedNameList = new ArrayList<>();
        List<String> originalNameList = new ArrayList<>();
        List<String> savedPathList = new ArrayList<>();

        // forEach 구문을 통해 multipartFile로 넘어온 파일들 하나씩 fileNameList에 추가
        multipartFile.forEach(file -> {

            String originalName = file.getOriginalFilename();
            originalNameList.add(originalName); // 파일 원본명 저장

            String fileName = createFileName(originalName);
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try (InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }
            savedNameList.add(fileName); //업로드된 파일명 저장

            String pathUrl = amazonS3.getUrl(bucket, fileName).toExternalForm();
            savedPathList.add(pathUrl); //파일 경로 저장


        });

        nameList.put("original", originalNameList);
        nameList.put("saved", savedNameList);
        nameList.put("path", savedPathList);

        return nameList;
    }


    public void deleteFile(Map<String, String> uploadedFiles) {
        uploadedFiles.entrySet().forEach(entry -> {
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, entry.getKey()));
        });
    }

    private String createFileName(String fileName) { // 먼저 파일 업로드 시, 파일명을 난수화하기 위해 random으로 돌립니다.
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며, 파일 타입과 상관없이 업로드할 수 있게 하기 위해 .의 존재 유무만 판단
        try {
            String extension = fileName.substring(fileName.lastIndexOf("."));
            // 이미지 파일과 동영상 파일만 허용하도록 제한
            if (!extension.equalsIgnoreCase(".jpg")
                    && !extension.equalsIgnoreCase(".jpeg")
                    && !extension.equalsIgnoreCase(".png")
                    && !extension.equalsIgnoreCase(".gif")
                    && !extension.equalsIgnoreCase(".mp4")) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "허용되지 않는 확장자의 파일(" + fileName + ") 입니다.");
            }
            return extension;
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }
}