package com.desweb.maintech.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.desweb.maintech.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

}
