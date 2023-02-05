package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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


//    @RequestMapping("addNewUser")
//    public String getCreationForm(Model model) {
//
//        User user = new User();
//        model.addAttribute("user", user);
//
//        return "user-info";
//    }

    @PostMapping("/user-info")
    public String saveNewUser(@ModelAttribute("user") User user) {

        userService.saveUser(user);
        return "redirect:/admin";
    }

//    @RequestMapping("/admin/{id}/edit")
//    public String getEditForm(Model model, @PathVariable("id") int id) {
//        model.addAttribute("user", userService.getUserById(id));
//        return "edit";
//    }

    @PostMapping("/admin/{id}/edit")
    public String editUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @RequestMapping("/admin/{id}/delete")
    public String deleteUser(@PathVariable(name = "id") int id) {
        userService.removeUserById(id);
        return "redirect:/admin";
    }


}
