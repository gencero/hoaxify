package com.hoaxify.ws.user;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.error.ApiError;

import shared.GenericResponse;

@RestController
public class UserController {
	
	//private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService userService;

	@PostMapping("/api/1.0/users")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		//log.info("user: " + user.toString());
		
		String username = user.getUsername();
		if (username == null || username.isEmpty()) {
			ApiError error = new ApiError(400, "Validation error", "/api/1.0/users");
			Map<String, String> validationErrors = new HashMap<>();
			validationErrors.put("username", "Username cannot be null");
			error.setValidationErrors(validationErrors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
		}
		userService.save(user);
		return ResponseEntity.ok(new GenericResponse("User created"));
	}

}
