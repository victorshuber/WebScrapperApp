package com.example.WebScrapperApp.security;


import com.example.WebScrapperApp.entities.UsersHib;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;

public class SecurityUserDetails implements UserDetails {

    private final UsersHib user;

    public SecurityUserDetails(UsersHib user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Implement authorities if any roles are present
        return null;
    }

    @Override
    public String getPassword() {
        return user.getUserPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // or implement based on your logic
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // or implement based on your logic
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // or implement based on your logic
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }
}

