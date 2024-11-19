package com.example.WebScrapperApp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "spring.mail")
public class MailConfiguration {

        private String host;
        private String port;
        private String username;
        private String password;

}
