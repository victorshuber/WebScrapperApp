package com.example.WebScrapperApp.service;


import com.example.WebScrapperApp.components.constants.UserRoles;
import com.example.WebScrapperApp.domain.entities.ConfirmationToken;
import com.example.WebScrapperApp.domain.entities.UserDetail;
import com.example.WebScrapperApp.domain.entities.UsersHib;
import com.example.WebScrapperApp.domain.models.userModels.UserRegisterModel;
import com.example.WebScrapperApp.repository.IConfirmationTokenRepository;
import com.example.WebScrapperApp.repository.IUserDetailRepository;
import com.example.WebScrapperApp.repository.IUserRepository;
import com.example.WebScrapperApp.security.SecurityUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class UserService implements IUserService, UserDetailsService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IUserDetailRepository userDetailRepository;

    @Autowired
    private IConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> saveUser(UserRegisterModel newUser) {
        if (userRepository.existsByUserEmail(newUser.getEmail())) {
            return createResponse(HttpStatus.BAD_REQUEST, "Email is already in use!");
        }

        UsersHib user = createUserEntity(newUser);
        userRepository.save(user);

        UserDetail userDetail = new UserDetail(user);
        userDetail.setUserLastname(newUser.getLastName());
        userDetail.setUserCountry(newUser.getCountry());
        userDetailRepository.save(userDetail);

        ConfirmationToken confirmationToken = new ConfirmationToken(user);
        confirmationTokenRepository.save(confirmationToken);

        sendConfirmationEmail(user.getUserEmail(), confirmationToken.getConfirmationToken());
        return createResponse(HttpStatus.OK, "Verify email by the link sent on your email address");
    }

    @Override
    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if (token == null) {
            return createResponse(HttpStatus.BAD_REQUEST, "Error: Couldn't verify email");
        }

        UsersHib user = token.getUserEntity();
        user.setEnabled(true);
        userRepository.saveAndFlush(user);

        String successMessage = "<H1>Email verified successfully!</p></br>" +
                "<p>This page can be closed</p>";
        return ResponseEntity.status(HttpStatus.OK).body(successMessage);
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
    public ResponseEntity<?> authenticateUser(String userEmail, String password) {
        try {
            UserDetails userDetails = loadUserByUsername(userEmail);

            if (!userDetails.isEnabled()) {
                return createResponse(HttpStatus.FORBIDDEN, "Error! Given user is not activated!");
            }

            if (passwordEncoder.matches(password, userDetails.getPassword())) {
                String token = SecurityUserDetails.generateToken(userEmail);
                return createResponse(HttpStatus.OK, Map.of("token", token));
            }

            return createResponse(HttpStatus.FORBIDDEN, "Error! Password did not match");

        } catch (UsernameNotFoundException ex) {
            return createResponse(HttpStatus.FORBIDDEN, "Error! Given user not found");
        }
    }

    // Helper Methods

    private UsersHib createUserEntity(UserRegisterModel newUser) {
        UsersHib user = new UsersHib();
        user.setUserEmail(newUser.getEmail());
        user.setUserName(newUser.getFirstName());
        user.setUserPassword(passwordEncoder.encode(newUser.getPassword()));
        user.setUserRole(UserRoles.USER_ROLE.name());


        return user;
    }

    private void sendConfirmationEmail(String userEmail, String token) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(userEmail);
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here: " +
                "http://localhost:8080/confirm-account?token=" + token);
        emailService.sendEmail(mailMessage);
    }

    private ResponseEntity<?> createResponse(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }

    private ResponseEntity<?> createResponse(HttpStatus status, Map<String, ?> body) {
        return ResponseEntity.status(status).body(body);
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
