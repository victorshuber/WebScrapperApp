package com.example.WebScrapperApp.controller;

import com.example.WebScrapperApp.domain.models.userModels.UserLoginModel;
import com.example.WebScrapperApp.domain.models.userModels.UserRegisterModel;
import com.example.WebScrapperApp.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {

    @Autowired
    public IUserService iUserService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterModel registerData) {
        return iUserService.saveUser(registerData);
    }

    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationToken) {
        return iUserService.confirmEmail(confirmationToken);
    }

    @RequestMapping(value="/login", method= {RequestMethod.POST})
    public ResponseEntity<?> auth(@RequestBody UserLoginModel loginData) throws Exception {
        String userEmail = loginData.getUserEmail();
        String password = loginData.getPassword();
        return iUserService.authenticateUser(userEmail, password);
    }

}
