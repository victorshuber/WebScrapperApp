package com.example.WebScrapperApp.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="confirmationToken")
public class ConfirmationToken {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="token_id")
    private Long tokenId;

    @Getter
    @Setter
    @Column(name="confirmation_token")
    private String confirmationToken;

    @Getter
    @Setter
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @OneToOne(targetEntity = UsersHib.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private UsersHib user;


    public ConfirmationToken(UsersHib user) {
        this.user = user;
        createdDate = new Date();
        confirmationToken = UUID.randomUUID().toString();
    }

    public UsersHib getUserEntity() {
        return user;
    }

    public void setUserEntity(UsersHib user) {
        this.user = user;
    }


}