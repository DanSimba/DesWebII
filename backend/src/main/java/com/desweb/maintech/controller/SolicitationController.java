package com.desweb.maintech.controller;

import com.desweb.maintech.dto.SolicitationDTO;
import com.desweb.maintech.service.SolicitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;

import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/api/solicitations")
@CrossOrigin(origins = "http://localhost:4200")
public class SolicitationController {

    @Autowired
    private SolicitationService solicitationService;

    @PostMapping
    public ResponseEntity<SolicitationDTO> inserir(@RequestBody SolicitationDTO dto, Authentication auth) {

        String email = auth.getName(); //acha o user logado
        SolicitationDTO criada = solicitationService.inserir(dto, email); //passa pro service inserir na sol
        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<SolicitationDTO>> buscarPorCliente(@PathVariable Long clientId) {
        List<SolicitationDTO> solicitacoes = solicitationService.buscarPorCliente(clientId);
        return ResponseEntity.ok(solicitacoes);
    }

    @GetMapping
    public ResponseEntity<List<SolicitationDTO>> buscarTodos() {
        List<SolicitationDTO> solicitacoes = solicitationService.buscarTodos();
        return ResponseEntity.ok(solicitacoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitationDTO> buscarPorId(@PathVariable Long id) {
        SolicitationDTO solicitacao = solicitationService.buscarPorId(id);
        return ResponseEntity.ok(solicitacao);
    }

    @GetMapping("/relatorio/periodo")
    public ResponseEntity<List<SolicitationDTO>> relatorioPeriodo(
            @RequestParam(value = "inicio", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(value = "fim", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        
        LocalDateTime dataInicio = (inicio != null) ? inicio.atStartOfDay() : LocalDateTime.of(2000, 1, 1, 0, 0);
        LocalDateTime dataFim = (fim != null) ? fim.atTime(23, 59, 59) : LocalDateTime.of(2100, 12, 31, 23, 59);

        List<SolicitationDTO> solicitacoes = solicitationService.buscarPorPeriodo(dataInicio, dataFim);
        return ResponseEntity.ok(solicitacoes);
    }

    @GetMapping("/relatorio/categoria")
    public ResponseEntity<List<SolicitationDTO>> relatorioCategoria(
            @RequestParam("categoria") String categoria) {
        List<SolicitationDTO> solicitacoes = solicitationService.buscarPorCategoria(categoria);
        return ResponseEntity.ok(solicitacoes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SolicitationDTO> atualizar(@PathVariable Long id, @RequestBody SolicitationDTO dto) {
        SolicitationDTO atualizada = solicitationService.atualizar(id, dto);
        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        solicitationService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/efetuar")
    public ResponseEntity<SolicitationDTO> efetuarManutencao(
            @PathVariable Long id, 
            @RequestBody(required = false) String orientacao) {
            
        SolicitationDTO finalizada = solicitationService.efetuarManutencao(id, orientacao);
        return ResponseEntity.ok(finalizada);
    }

    @PatchMapping("/{id}/redirecionar/{novoFuncionarioId}")
    public ResponseEntity<SolicitationDTO> redirecionar(
            @PathVariable Long id, 
            @PathVariable Long novoFuncionarioId) {
            
        SolicitationDTO redirecionada = solicitationService.redirecionar(id, novoFuncionarioId);
        return ResponseEntity.ok(redirecionada);
    }

    @PatchMapping("/{id}/mudar/{novoEstado}")
    public ResponseEntity<SolicitationDTO> updtEstado( @PathVariable Long id, @PathVariable String novoEstado) {
            
        SolicitationDTO mudada = solicitationService.mudarEst(id, novoEstado);
        return ResponseEntity.ok(mudada);
    }

    
}