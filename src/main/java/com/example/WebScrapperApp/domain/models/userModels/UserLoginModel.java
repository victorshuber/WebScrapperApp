package com.example.WebScrapperApp.domain.models.userModels;

import com.example.WebScrapperApp.components.constants.Messages.ValidationMessageConstants;
import com.example.WebScrapperApp.components.validations.annotations.Password;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public class UserLoginModel implements Serializable {
    private String userEmail;
    private String password;

    public UserLoginModel() {
    }

    @Pattern(regexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    @Size(min = 4, max = 16, message = ValidationMessageConstants.INVALID_CREDENTIALS_MESSAGE)
    public String getUserEmail() {
        return this.userEmail;
    }

    public void setUserMail(String userEmail) {
        this.userEmail = userEmail;
    }

    @Password(minLength = 4, maxLength = 16, containsOnlyLettersAndDigits = true, message = ValidationMessageConstants.INVALID_CREDENTIALS_MESSAGE )
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
