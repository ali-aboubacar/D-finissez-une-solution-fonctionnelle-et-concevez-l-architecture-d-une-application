package com.example.back.service;

import com.example.back.dtos.UserDto;
import com.example.back.exception.BadRequestException;
import com.example.back.exception.ResourceNotFoundException;
import com.example.back.mapper.UserMapper;
import com.example.back.model.ERole;
import com.example.back.model.User;
import com.example.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserMapper userMapper;
    /**
     * Verifie l'existance du nom dans le system.
     * @param name le nom a verifier.
     * @return true ou false apres verification
     */
    public Boolean findByName(String name){
        return userRepository.existsByName(name);
    }

    /**
     * Verifie l'existance de l'email dans le system.
     * @param email l'email a verifier.
     * @return true ou false apres verification
     */
    public Boolean existByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public User findByEmail(String email){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return user;
    }

    /**
     * Creation d'un utilisateur.
     * @param user utilisateur a creer.
     * @return l'utilisateur creer.
     */
    public User createUser(User user){
        return userRepository.save(user);
    }
    /**
     * Recupere un seul utilisateur grace a son identifiant.
     * @param id l'identifiant de l'utilisateur.
     * @return un utilisateur.
     */
    public Optional<User> getUserById(long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers(){
        UserDto currentUser = getCurrentUser();
        Optional<User> requester = userRepository.findByEmail(currentUser.getEmail());
        boolean hasAdminRole = requester.get().getRoles().stream()
                .anyMatch(role -> role.getName() == ERole.ROLE_ADMIN);
        if (hasAdminRole) {
            return userRepository.findAll();
        }else {
            throw new BadRequestException("access denied");
        }


    }
    public UserDto getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found" + userId));
        return userMapper.toUserDto(user);
    }


}
