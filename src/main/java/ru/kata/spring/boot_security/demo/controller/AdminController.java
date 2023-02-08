package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;
import java.util.List;

@Controller
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserServiceImpl userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @RequestMapping(value = "/admin")
    public String showUserInfo(Model model, Principal principal) {
        model.addAttribute("authorization", SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities().stream().findFirst().get().toString());
        model.addAttribute("user", userService.findByUsername(principal.getName()));
        model.addAttribute("allUs", userService.getAllUsers());
        model.addAttribute("newUser", new User());
        model.addAttribute("rolesAdd", roleService.getAllRoles());

        return "admin";
    }


    @PostMapping("/user-info")
    public String saveNewUser(@ModelAttribute("user") User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userService.saveUser(user);
        return "redirect:/admin";
    }


    @PostMapping("/admin/{id}/edit")
    public String editUser(@ModelAttribute("user") User user) {
//        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @RequestMapping("/admin/{id}/delete")
    public String deleteUser(@PathVariable(name = "id") int id) {
        userService.removeUserById(id);
        return "redirect:/admin";
    }

    @GetMapping("/login")
    public String getLoginPage(@RequestParam(value = "error", required = false) String error, Model model) {
        model.addAttribute("error", error != null);
        return "login";
    }


}
