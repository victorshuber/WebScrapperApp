package com.example.WebScrapperApp.components.constants;

public enum UserRoles {
    CUSTOMER_ROLE("customer"),
    USER_ROLE("user"),
    ADMIN_ROLE("admin"),
    ROOT("root");

    String role;

    UserRoles(String role) {
        this.role = role;
    }
    public String getRole(){
        return this.role;
    }
}
