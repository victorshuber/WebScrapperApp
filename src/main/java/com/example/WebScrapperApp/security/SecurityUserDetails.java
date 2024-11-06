package com.example.WebScrapperApp.security;


import com.example.WebScrapperApp.domain.entities.UsersHib;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Date;

public class SecurityUserDetails implements UserDetails {

    private final UsersHib user;
    private static final String SECRET_KEY = "1lnuh+x0e)^s-*(si9#n+w(^naa+y!+lroi44+rtg4ih%)i_g@";

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

    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiration
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}

