package com.example.WebScrapperApp.repository;

import com.example.WebScrapperApp.domain.entities.UsersHib;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

    @Repository
    public interface IUserRepository extends JpaRepository<UsersHib, Long> {
        UsersHib findByUserEmailIgnoreCase(String emailId);

        Boolean existsByUserEmail(String email);
    }



