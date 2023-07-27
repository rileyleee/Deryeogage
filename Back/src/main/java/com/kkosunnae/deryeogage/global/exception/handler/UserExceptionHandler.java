package com.kkosunnae.deryeogage.global.exception.handler;

import com.kkosunnae.deryeogage.global.util.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<Response<Object>> handleNoSuchUserException(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Response.error(exception.getMessage()));
    }
}
