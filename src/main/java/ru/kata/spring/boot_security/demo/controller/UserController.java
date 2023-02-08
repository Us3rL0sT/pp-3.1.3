package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;
import java.util.List;

@Controller
public class UserController {
    private final UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }


    @RequestMapping(value = "/user")
    public String showUserPage(Model model, Principal principal) {

        model.addAttribute("user", userService.findByUsername(principal.getName()));
        model.addAttribute("allUs", userService.findByUsername(principal.getName()));
        model.addAttribute("newUser", new User());

        return "user";
    }


}
