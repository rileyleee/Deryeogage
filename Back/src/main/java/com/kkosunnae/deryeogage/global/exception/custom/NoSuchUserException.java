package com.kkosunnae.deryeogage.global.exception.custom;

public class NoSuchUserException extends RuntimeException{

    public NoSuchUserException(String message) {
        super(message);
    }
}
