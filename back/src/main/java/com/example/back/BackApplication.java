package com.example.back;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BackApplication {

	public static void main(String[] args) {

		Dotenv dotenv = Dotenv.load();
		System.setProperty("SPRING_LOCAL_PORT", dotenv.get("SPRING_LOCAL_PORT"));
		System.setProperty("MYSQLDB_URL", dotenv.get("MYSQLDB_URL"));
		System.setProperty("MYSQLDB_USERNAME", dotenv.get("MYSQLDB_USERNAME"));
		System.setProperty("MYSQLDB_PASSWORD", dotenv.get("MYSQLDB_PASSWORD"));
		System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));
		System.setProperty("JWT_EXPIRATION", dotenv.get("JWT_EXPIRATION"));
		System.setProperty("HOST", dotenv.get("HOST"));
		System.setProperty("IP_HOST", dotenv.get("IP_HOST"));
		SpringApplication.run(BackApplication.class, args);
		System.out.println("hello word");
	}

}
