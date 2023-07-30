package com.kkosunnae.deryeogage.global.util;

public enum ResponseMessage {
    SUCCESS("성공적으로 요청되었습니다."),
    FAIL("요청이 실패했습니다."),
    ERROR("예외가 발생했습니다.");

    private final String message;

    ResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {

        return this.message;
    }
}