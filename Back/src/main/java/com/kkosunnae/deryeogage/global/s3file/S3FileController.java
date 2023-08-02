package com.kkosunnae.deryeogage.global.s3file;

import com.kkosunnae.deryeogage.global.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class S3FileController { //보드 병합 전 테스트용(최종본에서 삭제 예정-이은경)

    private final S3FileService s3FileService;

//    @PostMapping("/upload") // 파일 업로드 후 data에 리스트 형태로 반환 (프론트에서 이 값을 받아서 백 서버에 저장)
//    public Response<?> uploadFile(@RequestPart List<MultipartFile> multipartFile) {
//        return Response.success(s3FileService.uploadFile(multipartFile));
//    }
//
//
//    @DeleteMapping("/delete") //업로드된 파일 삭제
//    public Response<?> deleteFile(@RequestParam String savedName) {
//        s3FileService.deleteFile(savedName);
//        return Response.success(null);
//    }

}
