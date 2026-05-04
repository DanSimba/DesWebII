package com.desweb.maintech.service;

import com.desweb.maintech.dto.SolicitationDTO;
import com.desweb.maintech.entity.Solicitation;
import com.desweb.maintech.repository.SolicitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolicitationService {

    @Autowired
    private SolicitationRepository repository;

    private SolicitationDTO toDTO(Solicitation sol) {
        SolicitationDTO dto = new SolicitationDTO();
        dto.setId(sol.getId());
        dto.setDesc(sol.getDesc());
        dto.setEquip(sol.getEquip());
        dto.setData(sol.getData());
        dto.setEst(sol.getEst());
        return dto;
    }

    public SolicitationDTO inserir(SolicitationDTO dto) {
        Solicitation sol = new Solicitation();
        sol.setDesc(dto.getDesc());
        sol.setEquip(dto.getEquip());
        sol.setData(dto.getData());
        sol.setEst(dto.getEst());
        
        sol = repository.save(sol);
        return toDTO(sol);
    }

    public List<SolicitationDTO> buscarPorCliente(Long clientId) {
        return repository.findByClientId(clientId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<SolicitationDTO> buscarTodos() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public SolicitationDTO buscarPorId(Long id) {
        Solicitation sol = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        return toDTO(sol);
    }

    public SolicitationDTO atualizar(Long id, SolicitationDTO dto) {
      Solicitation sol = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        
        sol.setDesc(dto.getDesc());
        sol.setEquip(dto.getEquip());
        sol.setEst(dto.getEst());

        sol = repository.save(sol);
        return toDTO(sol);
    } 
    
    public void deletar(Long id) {
        repository.deleteById(id);
    }
}