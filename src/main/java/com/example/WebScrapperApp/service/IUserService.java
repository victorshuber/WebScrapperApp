package com.example.WebScrapperApp.service;

import com.example.WebScrapperApp.domain.entities.UsersHib;
import com.example.WebScrapperApp.domain.models.userModels.UserRegisterModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;


public interface IUserService extends UserDetailsService {

    ResponseEntity<?> saveUser(UserRegisterModel user);

    ResponseEntity<?> confirmEmail(String confirmationToken);

    ResponseEntity<?> authenticateUser(String username, String password);

}
