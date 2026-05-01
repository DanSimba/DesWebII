package main.java.com.desweb.maintech.repository;

import main.java.com.desweb.maintech.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {

}
