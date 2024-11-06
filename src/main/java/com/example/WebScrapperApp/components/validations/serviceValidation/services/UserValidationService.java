package com.example.WebScrapperApp.components.validations.serviceValidation.services;


import com.example.WebScrapperApp.components.constants.Users.User;
import com.example.WebScrapperApp.domain.models.serviceModels.UserServiceModel;
import com.example.WebScrapperApp.domain.models.userModels.UserRegisterModel;
import com.example.WebScrapperApp.domain.models.userModels.UserUpdateBindingModel;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserValidationService {
    boolean isValid(User user);

    boolean isValid(UserServiceModel userServiceModel);

    boolean isValid(UserRegisterModel userRegisterBindingModel);

    boolean isValid(String firstParam, String secondParam);

    boolean isValid(UserUpdateBindingModel userUpdateBindingModel);

    boolean isValid(UserDetails userData);
}
