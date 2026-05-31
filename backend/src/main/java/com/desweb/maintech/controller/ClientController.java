package com.desweb.maintech.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/me") //pega o token guardado no local storage, extrai o id e bota no request
    public ResponseEntity<ClientDTO> getLoggedClient(Authentication auth) {
        String email = auth.getName();
        ClientDTO client = service.findByEmail(email);
        System.out.println(auth);
        System.out.println(auth.getAuthorities());

        return ResponseEntity.ok(client);
    }

    @GetMapping("/{id}")
    public ClientDTO getClient(@PathVariable Long id) {
        return service.getClient(id);
    }

    @GetMapping //Pq precisamos disso? em algum momento vai ser necessario listar todos os clientes?
    public ResponseEntity<List<ClientDTO>> listAll() {
        return ResponseEntity.ok(service.listClients());
    }

    
}
