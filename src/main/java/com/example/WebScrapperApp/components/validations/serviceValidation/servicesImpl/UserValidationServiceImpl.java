package com.example.WebScrapperApp.components.validations.serviceValidation.servicesImpl;


import com.example.WebScrapperApp.components.constants.Users.User;
import com.example.WebScrapperApp.components.validations.serviceValidation.services.UserValidationService;
import com.example.WebScrapperApp.domain.models.serviceModels.UserServiceModel;
import com.example.WebScrapperApp.domain.models.userModels.UserRegisterModel;
import com.example.WebScrapperApp.domain.models.userModels.UserUpdateBindingModel;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class UserValidationServiceImpl implements UserValidationService {

    @Override
    public boolean isValid(User user) {
        return user != null;
    }

    @Override
    public boolean isValid(UserServiceModel userServiceModel) {
        return userServiceModel != null;
    }

    @Override
    public boolean isValid(UserRegisterModel userRegisterBindingModel) {
        return userRegisterBindingModel != null && isValid(userRegisterBindingModel.getPassword(), userRegisterBindingModel.getConfirmPassword());
    }

    @Override
    public boolean isValid(String firstParam, String secondParam) {
        return firstParam.equals(secondParam);
    }

    @Override
    public boolean isValid(UserUpdateBindingModel userUpdateBindingModel) {
        return userUpdateBindingModel != null;
    }

    @Override
    public boolean isValid(UserDetails userData) {
        return userData != null;
    }

}
