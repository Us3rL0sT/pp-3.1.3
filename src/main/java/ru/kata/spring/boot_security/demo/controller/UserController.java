package ru.kata.spring.boot_security.demo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.List;

@Controller
public class UserController {

    private final UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/admin")
    public String showUserInfo(Model model) {

        List<User> allUsers = userService.getAllUsers();
        model.addAttribute("allUs", allUsers);

        return "admin";
    }

    @RequestMapping(value = "/user")
    public String showUserPage(Model model) {

        List<User> allUsers = userService.getAllUsers();
        model.addAttribute("allUs", allUsers);

        return "user";
    }


    @RequestMapping("addNewUser")
    public String getCreationForm(Model model) {

        User user = new User();
        model.addAttribute("user", user);

        return "user-info";
    }

    @PostMapping("user-info")
    public String saveNewUser(@ModelAttribute("user") User user) {

        userService.saveUser(user);
        return "redirect:/admin";
    }

    @RequestMapping("{id}/edit")
    public String getEditForm(Model model, @PathVariable("id") int id) {
        model.addAttribute("user", userService.getUserById(id));
        return "edit";
    }

    @RequestMapping("{id}")
    public String editUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @RequestMapping("{id}/delete")
    public String deleteUser(@PathVariable(name = "id") int id) {
        userService.removeUserById(id);
        return "redirect:/admin";
    }

    @GetMapping(value = "index")
    public String welcomePage(ModelMap model){
        return "index";
    }

    @GetMapping(value = "logout")
    public String logOut(ModelMap model){
        return "redirect:/logout";
    }


}
