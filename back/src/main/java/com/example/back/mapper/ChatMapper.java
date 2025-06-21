package com.example.back.mapper;

import com.example.back.dtos.ChatDto;
import com.example.back.model.Chat;
import org.springframework.stereotype.Component;

@Component

public class ChatMapper {
    public ChatDto toChatDto(Chat chat){
        if (chat == null){
            return null;
        }

        ChatDto chatDto = new ChatDto();
        chatDto.setSender(chat.getSender().getEmail());
        chatDto.setContent(chat.getContent());
        chatDto.setRecipient(chat.getRecipient().getEmail());
        return chatDto;
    }
}
