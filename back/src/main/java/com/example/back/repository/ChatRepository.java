package com.example.back.repository;

import com.example.back.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findBySenderAndRecipient(String sender, String recipient);
    List<Chat> findByRecipient(String recipient);

    @Query("SELECT m FROM Chat m WHERE " +
            "(m.sender = :user1 AND m.recipient = :user2) OR " +
            "(m.sender = :user2 AND m.recipient = :user1) " +
            "ORDER BY m.timestamp ASC")
    List<Chat> findChatBetweenUsers(@Param("user1") String user1, @Param("user2") String user2);

}
