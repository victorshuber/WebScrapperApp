package com.example.WebScrapperApp.service;

import com.example.WebScrapperApp.entities.UsersHib;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;


public interface IUserService extends UserDetailsService {

    ResponseEntity<?> saveUser(UsersHib user);

    ResponseEntity<?> confirmEmail(String confirmationToken);


    String authenticateUser(String username, String password);
}
