package com.example.back.service;

import com.example.back.dtos.ChatDto;
import com.example.back.mapper.ChatMapper;
import com.example.back.model.Chat;
import com.example.back.repository.ChatRepository;
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
    private ChatMapper chatMapper;

    public void saveMessage(ChatDto chatMessage) {
        Chat msgEntity = new Chat();
        msgEntity.setSender(chatMessage.getSender());
        msgEntity.setRecipient(chatMessage.getRecipient());
        msgEntity.setContent(chatMessage.getContent());
        msgEntity.setTimestamp(LocalDateTime.now());
        chatRepository.save(msgEntity);
    }

    public List<ChatDto> getConversation(String sender, String recipient) {
        List<Chat> messages = new ArrayList<>();
        messages.addAll(chatRepository.findChatBetweenUsers(sender, recipient));
        List<ChatDto> messagesDtos = messages.stream().map(chatMapper::toChatDto).collect(Collectors.toList());
        return messagesDtos;
    }
}
