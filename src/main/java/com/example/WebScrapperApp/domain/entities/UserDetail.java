package com.example.WebScrapperApp.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="userDetail")
public class UserDetail extends BaseEntity{

    @Getter
    @Setter
    private String userLastname;

    @Getter
    @Setter
    private String userCountry;

    @Getter
    @Setter
    private Long userPictureId;

    @OneToOne(targetEntity = UsersHib.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "id")
    private UsersHib user;

    public UserDetail(UsersHib user) {
        this.user = user;
    }

    public UsersHib getUserEntity() {
        return user;
    }

    public void setUserEntity(UsersHib user) {
        this.user = user;
    }

}
