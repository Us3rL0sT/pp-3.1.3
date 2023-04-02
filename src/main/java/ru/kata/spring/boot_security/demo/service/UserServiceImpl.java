package ru.kata.spring.boot_security.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService, UserDetailsService {


    private UserRepository userRepository;
    private final RoleRepository roleRepository;
    public UserServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }


    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("User '%s' not found", username));
        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                user.getAuthorities());

    }


    @Override
    public User getUserById(int id) {
        Optional<User> userById = userRepository.findById(id);
        return userById.get();

    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public User saveUser(User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }


    @Transactional
    @Override
    public void removeUserById(int id) {
        userRepository.deleteById(id);
    }

    @Transactional
    @Override
    public void updateUser(int id, User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setId(id);
        userRepository.save(user);
    }

    @Override
    public User setRolesByUserId(int userId, int roleId) {
        User user = getUserById(userId);

        // тут нужно создать переменную с юзером и добавить ему эту роль.
        // user.setRoles(roles);
        Role role = roleRepository.getById(1);
        System.out.println(role);

        // users_roles подтянуть и туда добавить?
        System.out.println(1);
        //System.out.println(role);
        System.out.println(1);
        System.out.println(user.getId());
        System.out.println(user.getRoles());
        System.out.println(1);
        System.out.println(1);
        return userRepository.save(user);

        // Role role = getRoleById(roleId);
                 // нужно найти роль по id. присвоить роль юзеру и сохранить юзера.

        // дальше найти роль ща загуглю кое че
//        короче дальше сам)))
//        ищи как добавить и сохранить.
    }
}
