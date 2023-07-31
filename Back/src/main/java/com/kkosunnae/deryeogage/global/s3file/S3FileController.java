package com.kkosunnae.deryeogage.global.s3file;

import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class S3FileController {

    private final S3FileService s3FileService;

    @PostMapping("/upload") // 파일 업로드 후 리스트 형태로 반환
    public Response<?> uploadFile(@RequestPart List<MultipartFile> multipartFile) {
        return Response.success(s3FileService.uploadFile(multipartFile));
    }


    @DeleteMapping("/delete") //업로드된 파일 삭제
    public Response<?> deleteFile(@RequestParam String fileName) {
        s3FileService.deleteFile(fileName);
        return Response.success(null);
    }

}
