package com.example.WebScrapperApp.service;


import com.example.WebScrapperApp.domain.entities.UsersHib;
import com.example.WebScrapperApp.repository.IConfirmationTokenRepository;
import com.example.WebScrapperApp.repository.IUserRepository;
import com.example.WebScrapperApp.security.SecurityUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService implements IUserService, UserDetailsService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> saveUser(UsersHib user) {
        if (userRepository.existsByUserEmail(user.getUserEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Encode the password before saving
        user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        userRepository.save(user);

        // Rest of the code for sending confirmation email

        return ResponseEntity.ok("Verify email by the link sent on your email address");
    }

    @Override
    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        // Implementation for confirming email
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UsersHib user = userRepository.findByUserEmailIgnoreCase(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        return new SecurityUserDetails(user);
    }

    @Override
    public ResponseEntity<Map<String, String>> authenticateUser(String username, String password) {

        Map<String, String> response = new HashMap<>();
        try {
            System.out.println("\nReceived username is: " + username + "\nReceived password is: " + password);
            UserDetails userDetails = loadUserByUsername(username);

            if (passwordEncoder.matches(password, userDetails.getPassword())) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, userDetails.getAuthorities());
                authentication.setDetails(userDetails);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // Success response with token
                response.put("token", SecurityUserDetails.generateToken(username));
                return ResponseEntity.ok(response);
            } else {
                // Password mismatch
                response.put("message", "Error! Password did not match");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }
        } catch (UsernameNotFoundException ex) {
            // Username not found
            response.put("message", "Error! Given user not found");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
    }


}


/*package com.example.WebScrapperApp.service;

import com.example.WebScrapperApp.components.constants.Users.User;
import com.example.WebScrapperApp.entities.ConfirmationToken;
import com.example.WebScrapperApp.entities.UsersHib;
import com.example.WebScrapperApp.repository.IConfirmationTokenRepository;
import com.example.WebScrapperApp.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository iUserRepository;

    @Autowired
    IConfirmationTokenRepository IConfirmationTokenRepository;

    @Autowired
    EmailService emailService;

    @Override
    public ResponseEntity<?> saveUser(UsersHib user) {

        if (iUserRepository.existsByUserEmail(user.getUserEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        iUserRepository.save(user);

        ConfirmationToken confirmationToken = new ConfirmationToken(user);

        IConfirmationTokenRepository.save(confirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getUserEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here : "
                +"http://localhost:8085/confirm-account?token="+confirmationToken.getConfirmationToken());
        emailService.sendEmail(mailMessage);

        System.out.println("Confirmation Token: " + confirmationToken.getConfirmationToken());

        return ResponseEntity.ok("Verify email by the link sent on your email address");
    }

    @Override
    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        ConfirmationToken token = IConfirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if(token != null)
        {
            UsersHib user = iUserRepository.findByUserEmailIgnoreCase(token.getUserEntity().getUserEmail());
            user.setEnabled(true);
            iUserRepository.save(user);
            return ResponseEntity.ok("Email verified successfully!");
        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UsersHib user = iUserRepository.findByUserEmailIgnoreCase(username);
        User userDetails = new User(user);
        return userDetails;
    }
}*/
