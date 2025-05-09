package com.example.back.controller;

import com.example.back.dtos.UserDto;
import com.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/currentuser")
    public ResponseEntity<UserDto> getCurrentUser(){
        UserDto currentUser = userService.getCurrentUser();
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }
}
