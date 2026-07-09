
package com.bracket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Application {

	@RequestMapping("/test")
	public String home() {
		return "Hello World!";
	}

	@RequestMapping("/testauth")
	public String home2() {
		return "You are logged in!";
	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
