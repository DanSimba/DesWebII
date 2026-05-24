package com.desweb.maintech.service;

import com.desweb.maintech.dto.SolicitationDTO;
import com.desweb.maintech.entity.Client;
import com.desweb.maintech.entity.EstadoSolicitacao;
import com.desweb.maintech.repository.SolicitationRepository;
import com.desweb.maintech.entity.Funcionario;
import com.desweb.maintech.entity.Solicitation;
import com.desweb.maintech.repository.ClientRepository;
import com.desweb.maintech.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolicitationService {

    @Autowired
    private SolicitationRepository repository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private ClientRepository clientRepository;

    private SolicitationDTO toDTO(Solicitation sol) {
        SolicitationDTO dto = new SolicitationDTO();
        dto.setId(sol.getId());
        dto.setDesc(sol.getDesc());
        dto.setEquip(sol.getEquip());
        dto.setData(sol.getData());
        dto.setEst(sol.getEst());
        dto.setIdCliente(sol.getClient().getId());

        return dto;
    }

    
    public SolicitationDTO inserir(SolicitationDTO dto, String email) {

        Client c = clientRepository
            .findByUserEmail(email) //acha o usuário pelo email passado no endpoint
            .orElseThrow();

        Solicitation sol = new Solicitation();
        sol.setDesc(dto.getDesc());
        sol.setEquip(dto.getEquip());
        sol.setData(dto.getData());
        sol.setEst(dto.getEst());
        sol.setClient(c);
        
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

    public SolicitationDTO efetuarManutencao(Long id, String orientacao) {
        Solicitation sol = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        
        if (!"PAGA".equals(sol.getEst())) {
            throw new RuntimeException("Apenas solicitações PAGA podem ser finalizadas.");
        }
        
        sol.setEst(EstadoSolicitacao.valueOf("FINALIZADA"));
        sol.setOrientacao(orientacao);

        sol = repository.save(sol);
        return toDTO(sol);
    }

    public SolicitationDTO redirecionar(Long id, Long novoFuncionarioId) {
        Solicitation sol = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        
        Funcionario novoResp = funcionarioRepository.findById(novoFuncionarioId)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        sol.setFuncionario(novoResp);

        sol = repository.save(sol);
        return toDTO(sol);
    }

    public SolicitationDTO mudarEst(Long id, String novoEstado){
        Solicitation sol = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        
        switch (novoEstado) {
            case "APROVADA":
                sol.setEst(EstadoSolicitacao.APROVADA); //tem que explicar pro java que isso é da classe enum (vergonhoso)
                break;
            case "REJEITADA":
                sol.setEst(EstadoSolicitacao.REJEITADA);
                break;
            case "PAGA":
                sol.setEst(EstadoSolicitacao.PAGA);
                break;
            case "ABERTA": //o cliente pode reabrir se ele rejeitar
                sol.setEst(EstadoSolicitacao.ABERTA);
                break;
        
            default:
                break;
        }

        repository.save(sol);

        return toDTO(sol);
    }

    //relatorios
    public List<SolicitationDTO> buscarPorPeriodo(LocalDateTime inicio, LocalDateTime fim) {
        return repository.findByDataHoraBetween(inicio, fim).stream()
                .filter(sol -> sol.getEst() == EstadoSolicitacao.PAGA || sol.getEst() == EstadoSolicitacao.FINALIZADA)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<SolicitationDTO> buscarPorCategoria(String categoriaNome) {
        return repository.findAll().stream()
                .filter(sol -> sol.getEst() == EstadoSolicitacao.PAGA || sol.getEst() == EstadoSolicitacao.FINALIZADA)
                .filter(sol -> sol.getEquip() != null && sol.getEquip().toLowerCase().contains(categoriaNome.toLowerCase()))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}