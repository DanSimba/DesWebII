package com.desweb.maintech.controller;

import com.desweb.maintech.dto.SolicitationDTO;
import com.desweb.maintech.service.SolicitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitations")
@CrossOrigin(origins = "*")
public class SolicitationController {

    @Autowired
    private SolicitationService solicitationService;

    @PostMapping
    public ResponseEntity<SolicitationDTO> inserir(@RequestBody SolicitationDTO dto) {
        SolicitationDTO criada = solicitationService.inserir(dto);
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
}