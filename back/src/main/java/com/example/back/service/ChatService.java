package com.example.back.service;

import com.example.back.dtos.ChatDto;
import com.example.back.mapper.ChatMapper;
import com.example.back.model.Chat;
import com.example.back.model.User;
import com.example.back.repository.ChatRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatMapper chatMapper;

    public void saveMessage(ChatDto chatMessage) {
        Chat msgEntity = new Chat();
        msgEntity.setSender(userService.findByEmail(chatMessage.getSender()));
        msgEntity.setRecipient(userService.findByEmail(chatMessage.getRecipient()));
        msgEntity.setContent(chatMessage.getContent());
        msgEntity.setTimestamp(LocalDateTime.now());
        chatRepository.save(msgEntity);
    }

    @Transactional
    public List<ChatDto> getConversation(String senderEmail, String recipientEmail) {
        List<Chat> messages = new ArrayList<>();
        messages.addAll(chatRepository.findChatBetweenUsers(senderEmail, recipientEmail));
        List<ChatDto> messagesDtos = messages.stream().map(chatMapper::toChatDto).collect(Collectors.toList());
        return messagesDtos;
    }
}
