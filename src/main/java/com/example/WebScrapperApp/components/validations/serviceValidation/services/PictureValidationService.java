package com.example.WebScrapperApp.components.validations.serviceValidation.services;

import com.example.WebScrapperApp.domain.entities.Picture;

public interface PictureValidationService {
    boolean isValid(Picture picture);
}
