package com.example.WebScrapperApp.components.validations.serviceValidation.services;

import com.example.WebScrapperApp.components.constants.UserRoles;

public interface RoleValidationService {
    boolean isValid(UserRoles role);
}
