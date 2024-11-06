package com.example.WebScrapperApp.components.validations.serviceValidation.servicesImpl;

import com.example.WebScrapperApp.components.validations.serviceValidation.services.LoggerValidationService;
import com.example.WebScrapperApp.domain.models.serviceModels.LoggerServiceModel;
import org.springframework.stereotype.Component;

@Component
public class LoggerValidationServiceImpl implements LoggerValidationService {
    @Override
    public boolean isValid(LoggerServiceModel loggerServiceModel) {
        return loggerServiceModel != null;
    }

    @Override
    public boolean isValid(String method, String principal, String tableName, String action) {
        return method != null && principal != null && tableName != null && action != null;
    }

    @Override
    public boolean isValid(String username) {
        return username != null;
    }
}
