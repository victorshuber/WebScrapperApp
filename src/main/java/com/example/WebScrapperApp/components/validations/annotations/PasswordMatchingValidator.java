package com.example.WebScrapperApp.components.validations.annotations;

import com.example.WebScrapperApp.domain.models.userModels.UserRegisterModel;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;


@Component
public class PasswordMatchingValidator implements ConstraintValidator<PasswordMatching, Object> {
    @Override
    public void initialize(PasswordMatching constraintAnnotation) {

    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (o instanceof UserRegisterModel) {
            UserRegisterModel user = (UserRegisterModel) o;
            return user.getPassword().equals(user.getConfirmPassword());
        }
        return false;
    }
}
