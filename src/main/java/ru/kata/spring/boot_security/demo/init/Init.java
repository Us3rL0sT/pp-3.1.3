//package ru.kata.spring.boot_security.demo.init;
//
//
//import org.springframework.stereotype.Component;
//import ru.kata.spring.boot_security.demo.model.Role;
//import ru.kata.spring.boot_security.demo.model.User;
//import ru.kata.spring.boot_security.demo.service.RoleService;
//import ru.kata.spring.boot_security.demo.service.UserService;
//
//import javax.annotation.PostConstruct;
//import java.util.Set;
//
//@Component
//public class Init {
//    private final RoleService roleService;
//    private final UserService userService;
//
//    public Init(RoleService roleService, UserService userService) {
//        this.roleService = roleService;
//        this.userService = userService;
//    }
//
//
//    @PostConstruct
//    private void postConstruct() {
//        Role roleAdmin = new Role("ROLE_ADMIN");
//        Role roleUser = new Role("ROLE_USER");
//        roleService.saveRole(roleAdmin);
//        roleService.saveRole(roleUser);
//
//
//        // пароль 123
//        User admin = new User(1, "admin","Mr goldman" ,
//                "$2a$12$PyGfS7GtjU750Nn2HdewZOv1pxJnfA2tUZ8s6vB0XuHD0/qdS08i2", "admin@mail.ru",
//               "7929239391",
//                Set.of(roleAdmin, roleUser));
//
//
//        userService.saveUser(admin);
//        roleService.saveRole(roleUser);
//
//        User user = new User(2, "user","Bob Pop",
//                "$2a$12$PyGfS7GtjU750Nn2HdewZOv1pxJnfA2tUZ8s6vB0XuHD0/qdS08i2", "user@mail.ru",
//                "7743727473",
//                Set.of(roleUser));
//
//        userService.saveUser(user);
//
//    }
//
//
//}
