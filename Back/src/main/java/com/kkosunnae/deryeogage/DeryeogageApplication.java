package com.kkosunnae.deryeogage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Properties;

@SpringBootApplication
public class DeryeogageApplication {

    //S3 위한 처리
    static {
        System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
    }

    public static void main(String[] args) {

        //SpringApplication.run(DeryeogageApplication.class, args);


        SpringApplication application = new SpringApplication(DeryeogageApplication.class);
        Properties properties = new Properties();
        properties.put("spring.config.name", "application,application-s3");
        application.setDefaultProperties(properties);
        application.run(args);
    }

}
