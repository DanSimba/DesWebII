package com.desweb.maintech.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.desweb.maintech.dto.FuncionarioDTO;
import com.desweb.maintech.service.FuncionarioService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/funcionarios")
@CrossOrigin(origins = "*")
public class FuncionarioController {
    private final FuncionarioService service;

    public FuncionarioController(FuncionarioService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os funcionarios")
    @GetMapping
    public ResponseEntity<List<FuncionarioDTO>> listar(){
        return ResponseEntity.ok(service.listar());
    }

    @Operation(summary = "Busca funcionario pelo Id")
    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioDTO> buscarPorId(@PathVariable Long id){
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @Operation(summary = "Busca funcionario pelo email")
    @GetMapping("/me")
    public ResponseEntity<FuncionarioDTO> buscarPorEmail(Authentication auth) {
        String email = auth.getName();
        FuncionarioDTO func = service.buscarPorEmail(email);
        System.out.println(auth);
        System.out.println(auth.getAuthorities());
        return ResponseEntity.ok(func);

    }

    @Operation(summary = "Salva um novo funcionario")
    @PostMapping
    public ResponseEntity<FuncionarioDTO> criar(@RequestBody FuncionarioDTO dto) {
        FuncionarioDTO funcionario = service.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(funcionario);
    }

    @Operation(summary = "Atualiza um funcionario")
    @PutMapping("/{id}")
    public ResponseEntity<FuncionarioDTO> atualizar(@PathVariable Long id, @RequestBody FuncionarioDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @Operation(summary = "Remove um funcionario")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
