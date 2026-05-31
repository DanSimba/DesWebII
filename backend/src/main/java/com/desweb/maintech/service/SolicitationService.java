package com.desweb.maintech.service;

import com.desweb.maintech.dto.HistoricoDTO;
import com.desweb.maintech.dto.SolicitationDTO;
import com.desweb.maintech.entity.Client;
import com.desweb.maintech.entity.EstadoSolicitacao;
import com.desweb.maintech.repository.SolicitationRepository;
import com.desweb.maintech.entity.Funcionario;
import com.desweb.maintech.entity.Historico;
import com.desweb.maintech.entity.Solicitation;
import com.desweb.maintech.repository.ClientRepository;
import com.desweb.maintech.repository.FuncionarioRepository;
import com.desweb.maintech.repository.HistoricoRepository;
import com.desweb.maintech.entity.Categoria;
import com.desweb.maintech.repository.CategoriaRepository;
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
    private HistoricoRepository histRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    private SolicitationDTO toDTO(Solicitation sol) {
        SolicitationDTO dto = new SolicitationDTO();
        dto.setId(sol.getId());
        dto.setDesc(sol.getDesc());
        dto.setEquip(sol.getEquip());
        dto.setData(sol.getData());
        dto.setEst(sol.getEst());
        dto.setIdCliente(sol.getClient().getId());
        dto.setValorOrcamento(sol.getValorOrcamento());

        if(sol.getMotivoRej()!=null) dto.setMotivoRej(sol.getMotivoRej());

        Client cliente = sol.getClient();
        dto.setNomeCliente(cliente.getNome());
        dto.setCpfCliente(cliente.getCpf());
        dto.setEmailCliente(cliente.getEmail());

        if(sol.getCategoria() != null){
            dto.setNomeCategoria(sol.getCategoria().getNome());
        }

        if(sol.getFuncionario() != null){
            dto.setIdFuncDestino(sol.getFuncionario().getId());
        }

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

        if (dto.getIdCategoria() != null) {
        Categoria cat = categoriaRepository.findById(dto.getIdCategoria()).orElse(null);
        sol.setCategoria(cat);
        }
        
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
        
        if (dto.getDesc() != null) sol.setDesc(dto.getDesc());
        if (dto.getEquip() != null) sol.setEquip(dto.getEquip());
        if (dto.getEst() != null) sol.setEst(dto.getEst()); 
        if (dto.getValorOrcamento() != null) sol.setValorOrcamento(dto.getValorOrcamento());

        sol = repository.save(sol);
        return toDTO(sol);
    } 
    
    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public SolicitationDTO efetuarManutencao(Long id, String orientacao) {
        Solicitation sol = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        
        EstadoSolicitacao antes = sol.getEst();
        if (antes != EstadoSolicitacao.APROVADA && antes != EstadoSolicitacao.REDIRECIONADA) {
            throw new RuntimeException("Apenas solicitações APROVADA ou REDIRECIONADA podem ser executadas.");
        }
        
        sol.setEst(EstadoSolicitacao.ARRUMADA); 
        sol.setOrientacao(orientacao);

        sol = repository.save(sol);
        registrarHistorico(sol, antes, EstadoSolicitacao.ARRUMADA, null, null);
        return toDTO(sol);
    }

    public SolicitationDTO redirecionar(Long id, Long novoFuncionarioId) {
        Solicitation sol = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        EstadoSolicitacao antes = sol.getEst();
        Funcionario novoResp = funcionarioRepository.findById(novoFuncionarioId)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        sol.setFuncionario(novoResp);
        sol.setEst(EstadoSolicitacao.REDIRECIONADA);

        sol = repository.save(sol);
        registrarHistorico(sol, antes, EstadoSolicitacao.REDIRECIONADA, "Redirecionada para: "+ novoResp.getNome(), novoResp);

        return toDTO(sol);
    }

    public SolicitationDTO mudarEst(Long id, String novoEstado){
        Solicitation sol = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        EstadoSolicitacao antes = sol.getEst();
        EstadoSolicitacao depois = null;

        switch (novoEstado) {
            case "APROVADA":
                depois = EstadoSolicitacao.APROVADA; //tem que explicar pro java que isso é da classe enum (vergonhoso)
                break;
            case "REJEITADA":
                depois = EstadoSolicitacao.REJEITADA;
                break;
            case "PAGA":
                depois = EstadoSolicitacao.PAGA;
                break;
            case "ABERTA": //o cliente pode reabrir se ele rejeitar
                depois = EstadoSolicitacao.ABERTA;
                break;
            default:
                break;
        }

        if (depois != null){
            sol.setEst(depois);
            sol = repository.save(sol);
            registrarHistorico(sol, antes, depois, null, null);
        }

        return toDTO(sol);
    }

    public SolicitationDTO rejeitar(Long id, String motivo){
        Solicitation sol = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        
        EstadoSolicitacao antes = sol.getEst();
        sol.setEst(EstadoSolicitacao.REJEITADA);
        sol.setMotivoRej(motivo);

        repository.save(sol);
        registrarHistorico(sol, antes, EstadoSolicitacao.REJEITADA, motivo, null);

        return toDTO(sol);
    }

    //relatorios
    public List<SolicitationDTO> buscarPorPeriodo(LocalDateTime inicio, LocalDateTime fim) {
        return repository.findByDataHoraBetween(inicio, fim).stream()
                .filter(sol -> sol.getEst() == EstadoSolicitacao.PAGA || sol.getEst() == EstadoSolicitacao.FINALIZADA)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<SolicitationDTO> buscarRelatorioCategorias() {
        return repository.findAll().stream()
                .filter(sol -> sol.getEst() == EstadoSolicitacao.PAGA || sol.getEst() == EstadoSolicitacao.FINALIZADA)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public String pegarMotivo(Long id){
        Solicitation sol = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        //System.out.println("MOTIVO DO BANCO: " + sol.getMotivoRej());
        return sol.getMotivoRej(); //só pega o motivo e não altera nd no banco
    }

    private void registrarHistorico (Solicitation sol, EstadoSolicitacao antes, EstadoSolicitacao depois, 
                                        String observacao, Funcionario func){
        Historico hist = new Historico();
        hist.setSolicitacao(sol);
        hist.setEstadoAnterior(antes);
        hist.setEstadoNovo(depois);
        hist.setObservacao(observacao);
        hist.setDataHora(LocalDateTime.now());
        hist.setFuncionario(func);

        histRepository.save(hist);

    }

    public List<HistoricoDTO> buscarHistorico(Long solicitacaoId){
        return histRepository.findBySolicitacaoIdOrderByDataHora(solicitacaoId)
            .stream().map(
                hist -> {
                    HistoricoDTO dto = new HistoricoDTO();
                    dto.setId(hist.getId());
                    dto.setDataHora(hist.getDataHora());
                    dto.setObservacao(hist.getObservacao());
                    if (hist.getEstadoAnterior() != null) {
                        dto.setEstadoAnterior(hist.getEstadoAnterior());
                    }
                    dto.setEstadoNovo(hist.getEstadoNovo());
                    if(hist.getFuncionario() != null){
                        dto.setNomeFuncionario(hist.getFuncionario().getNome());
                    }
                    return dto; 
                }
            ).collect(Collectors.toList());
    }
}