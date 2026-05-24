package com.desweb.maintech.repository;

import com.desweb.maintech.entity.Solicitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SolicitationRepository extends JpaRepository<Solicitation, Long> {
    List<Solicitation> findByClientId(Long clientId);

    List<Solicitation> findByDataHoraBetween(LocalDateTime dataInicio, LocalDateTime dataFim);
    
}