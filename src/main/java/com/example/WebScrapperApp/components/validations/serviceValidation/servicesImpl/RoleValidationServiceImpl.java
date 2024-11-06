package com.example.WebScrapperApp.components.validations.serviceValidation.servicesImpl;


import com.example.WebScrapperApp.components.constants.UserRoles;
import com.example.WebScrapperApp.components.validations.serviceValidation.services.RoleValidationService;
import org.springframework.stereotype.Component;

@Component
public class RoleValidationServiceImpl implements RoleValidationService {
    @Override
    public boolean isValid(UserRoles role) {
        return role != null;
    }
}
