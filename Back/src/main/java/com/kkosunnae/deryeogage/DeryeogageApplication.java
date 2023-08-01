package com.kkosunnae.deryeogage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class DeryeogageApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeryeogageApplication.class, args);
	}

}
