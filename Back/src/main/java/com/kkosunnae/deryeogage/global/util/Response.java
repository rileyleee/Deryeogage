package com.kkosunnae.deryeogage.global.util;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Response<T> {

    private static final String SUCCESS_STATUS = "success";
    private static final String FAIL_STATUS = "fail";
    private static final String ERROR_STATUS = "error";

    private String status;
    private String message;
    private T data;

    public static <T> Response<T> success(T data) {
        return new Response<>(SUCCESS_STATUS, ResponseMessage.SUCCESS.getMessage(), data);
    }

    public static <T> Response<T> fail(T data) {
        return new Response<>(FAIL_STATUS, ResponseMessage.FAIL.getMessage(), data);
    }

    public static <T> Response<T> error(T data) {
        return new Response<>(ERROR_STATUS, ResponseMessage.ERROR.getMessage(), data);
    }

}