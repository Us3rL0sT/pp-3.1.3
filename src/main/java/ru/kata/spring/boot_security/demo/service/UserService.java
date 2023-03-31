package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;

public interface UserService extends UserDetailsService {


    User findByUsername(String username);

    User getUserById(int id);

    List<User> getAllUsers();

    User saveUser(User user);

    void removeUserById(int id);

    void updateUser(int id, User user);

    void addRole(int id, int roleId);


}
