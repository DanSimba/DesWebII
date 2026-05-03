package com.desweb.maintech.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desweb.maintech.dto.ClientDTO;
import com.desweb.maintech.service.ClientService;

@RestController
@RequestMapping("/client")
public class ClientController {

    public final ClientService service;

    public ClientController(ClientService s) {
        this.service = s;
    }

    @GetMapping("/{id}")
    public ClientDTO getClient(@PathVariable Long id) {
        return service.getClient(id);
    }

    public ResponseEntity<List<ClientDTO>> listAll() {
        return ResponseEntity.ok(service.listClients());
    }

    @PostMapping
    public ResponseEntity<ClientDTO> criar(@RequestBody ClientDTO dto) {
        ClientDTO novo = service.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }
}
