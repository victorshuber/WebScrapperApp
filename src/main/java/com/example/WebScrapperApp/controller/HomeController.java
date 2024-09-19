package com.example.WebScrapperApp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
public class HomeController {

    @RequestMapping(value = "/home")
    public String homePage() {
        return "home";
    }

    @RequestMapping(value = "/login")
    public String loginPage() {
        return "login";
    }

}
