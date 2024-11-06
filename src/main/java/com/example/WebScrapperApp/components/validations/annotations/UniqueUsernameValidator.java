package com.example.WebScrapperApp.components.validations.annotations;

import com.example.WebScrapperApp.components.constants.Users.User;
import com.example.WebScrapperApp.service.IUserService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


@Component
public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername,String> {

    private IUserService userService;

    @Autowired
    public UniqueUsernameValidator(IUserService userService) {
        this.userService = userService;
    }

    @Override
    public void initialize(UniqueUsername username) {

    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
        UserDetails user = this.userService.loadUserByUsername(username);
        return user == null;
    }
}

