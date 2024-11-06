package com.example.WebScrapperApp.components.validations.serviceValidation.servicesImpl;


import com.example.WebScrapperApp.components.validations.serviceValidation.services.PictureValidationService;
import com.example.WebScrapperApp.domain.entities.Picture;
import org.springframework.stereotype.Component;

@Component
public class PictureValidationServiceImpl implements PictureValidationService {
    @Override
    public boolean isValid(Picture picture) {
        return picture != null;
    }
}
