package ru.kata.spring.boot_security.demo.service;




import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

@Service
public interface UserService {

    List<User> getAllUsers();

    void removeUserById(int id);

    User saveUser(User user);

//    User updateUser(int id, User user); // какой смысл в update? без него же всё прекрасно работает

    User getUserById(int id);
}
