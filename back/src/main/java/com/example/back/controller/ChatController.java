package com.example.back.controller;

import com.example.back.dtos.ChatDto;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import java.time.LocalDateTime;

public class ChatController {
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatDto sendMessage(ChatDto message) {
        message.setTimestamp(LocalDateTime.now().toString());
        return message;
    }
}
