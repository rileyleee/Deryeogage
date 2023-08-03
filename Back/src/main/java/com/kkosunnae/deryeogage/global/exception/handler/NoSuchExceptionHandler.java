package com.kkosunnae.deryeogage.global.exception.handler;

import com.kkosunnae.deryeogage.global.exception.custom.NoSuchUserException;
import com.kkosunnae.deryeogage.global.util.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;
@ControllerAdvice
public class NoSuchExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Response<Object>> handleNoSuchElementException(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Response.error(exception.getMessage()));
    }

    @ExceptionHandler(NoSuchUserException.class)
    public ResponseEntity<Response<Object>> handleNoSuchUserException(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Response.error(exception.getMessage()));
    }
}
