package com.example.WebScrapperApp.domain.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class UsersHib extends BaseEntity{

    private String userName;

    private String userEmail;

    private String userPassword;
    private String userRole;

    private boolean isEnabled;

}
