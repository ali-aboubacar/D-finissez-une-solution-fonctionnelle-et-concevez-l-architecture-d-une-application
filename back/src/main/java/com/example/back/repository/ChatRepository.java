package com.example.back.repository;

import com.example.back.model.Chat;
import com.example.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query("SELECT m FROM Chat m " +
            "WHERE (m.sender.email = :email1 AND m.recipient.email = :email2) " +
            "   OR (m.sender.email = :email2 AND m.recipient.email = :email1) " +
            "ORDER BY m.timestamp ASC")
    List<Chat> findChatBetweenUsers(@Param("email1") String email1, @Param("email2") String email2);

}
