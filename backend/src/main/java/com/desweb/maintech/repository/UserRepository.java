package com.desweb.maintech.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.desweb.maintech.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
