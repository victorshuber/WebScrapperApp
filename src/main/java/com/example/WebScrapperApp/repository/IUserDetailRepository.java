package com.example.WebScrapperApp.repository;

import com.example.WebScrapperApp.domain.entities.UserDetail;
import com.example.WebScrapperApp.domain.entities.UsersHib;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("userDetailRepository")
public interface IUserDetailRepository extends JpaRepository<UserDetail, Long> {

//    UserDetail findByUserDetailId(Long userDetailId);
//    UserDetail findByUser(UsersHib user);
}
