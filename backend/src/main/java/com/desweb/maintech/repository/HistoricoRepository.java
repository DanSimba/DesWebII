package com.desweb.maintech.repository;


import com.desweb.maintech.entity.Historico;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoRepository extends JpaRepository<Historico, Long> {
    List<Historico> findBySolicitacaoIDOrderByDataHora(Long soliitacaoId); 
}
