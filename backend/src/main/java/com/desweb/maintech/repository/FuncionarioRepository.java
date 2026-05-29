package com.desweb.maintech.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.desweb.maintech.entity.Funcionario;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    boolean existsByNomeIgnoreCaseAndIdNot(String nome, Long id);

    Optional<Funcionario> findByUserEmail(String email);
}
