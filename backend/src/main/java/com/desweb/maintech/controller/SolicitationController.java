package com.desweb.maintech.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/solicitacoes")
@CrossOrigin(origins = "*")
public class SolicitationController {

  
    @PostMapping
    public ResponseEntity<Void> criarSolicitacao() {

        return ResponseEntity.ok().build();
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<Void> listarPorCliente(@PathVariable Long clientId) {

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Void> buscarPorId(@PathVariable Long id) {

        return ResponseEntity.ok().build();
    }
}
