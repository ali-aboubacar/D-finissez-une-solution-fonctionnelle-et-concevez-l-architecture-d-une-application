package com.example.back.jwtUtils;

import com.example.back.dtos.ChatDto;
import com.example.back.dtos.UserDto;
import com.example.back.model.ERole;
import com.example.back.model.User;
import com.example.back.repository.UserRepository;
import com.example.back.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {
    @Autowired
    private JwtUtils jwtUtil;

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserRepository userRepository;
    private final Map<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();
    private final Map<String, String> sessionUsers = new ConcurrentHashMap<>();


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String query = session.getUri().getQuery();
        String token = query != null ? query.split("=")[1] : null;
        if (token == null || !jwtUtil.validateJwtToken(token)) {
            session.close(CloseStatus.NOT_ACCEPTABLE.withReason("Invalid token"));
            return;
        }
        String username = jwtUtil.getEmailFromJwtToken(token);
        userSessions.put(username, session);
        sessionUsers.put(session.getId(), username);


        Optional<User> requester = userRepository.findByEmailWithRoles(username);
        boolean hasAdminRole = requester.get().getRoles().stream()
                .anyMatch(role -> role.getName() == ERole.ROLE_ADMIN);
        if(!hasAdminRole){
            List<ChatDto> oldMessages = chatService.getConversation(username, "support@chat.com");
            for (ChatDto msg : oldMessages) {
                session.sendMessage(new TextMessage(new ObjectMapper().writeValueAsString(msg)));
            }
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        ChatDto chatMessage = mapper.readValue(message.getPayload(), ChatDto.class);

        String from = sessionUsers.get(session.getId());
        if (from == null || chatMessage.getRecipient() == null || chatMessage.getContent() == null) return;

        chatMessage.setSender(from);

        chatService.saveMessage(chatMessage);
        String jsonMessage = mapper.writeValueAsString(chatMessage);

        // Send to recipient
        WebSocketSession recipientSession = userSessions.get(chatMessage.getRecipient());
        if (recipientSession != null) {
            recipientSession.sendMessage(new TextMessage(jsonMessage));
        }

        // Echo back to sender
        session.sendMessage(new TextMessage(jsonMessage));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String username = sessionUsers.remove(session.getId());
        if (username != null) {
            userSessions.remove(username);
        }
    }
}