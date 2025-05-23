package com.example.back.controller;

import com.example.back.dtos.ChatDto;
import com.example.back.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private ChatService chatService;

    @GetMapping("/messages")
    public List<ChatDto> getMessages(@RequestParam String sender, @RequestParam String recipient) {
        return chatService.getConversation(sender, recipient);
    }
}
