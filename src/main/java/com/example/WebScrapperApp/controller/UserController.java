package com.example.WebScrapperApp.controller;

import com.example.WebScrapperApp.entities.UsersHib;
import com.example.WebScrapperApp.service.IUserService;
import com.example.WebScrapperApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {

    @Autowired
    public IUserService iUserService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UsersHib user) {
        return iUserService.saveUser(user);
    }

    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationToken) {
        return iUserService.confirmEmail(confirmationToken);
    }

    @RequestMapping(value="/login", method= {RequestMethod.POST})
    public String auth(@RequestParam(value = "username") String username, @RequestParam(value = "password") String password) throws Exception {
        return iUserService.authenticateUser(username, password);
    }

}
