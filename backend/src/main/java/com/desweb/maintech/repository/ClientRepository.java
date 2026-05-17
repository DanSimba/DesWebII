package com.desweb.maintech.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.desweb.maintech.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByUserEmail(String email);
}
