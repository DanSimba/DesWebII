package main.java.maintec.controller;

import org.springframework.web.bind.annotation.*;

import main.java.maintec.dto.ClientDTO;
import main.java.maintec.service.ClientService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
public class ClientController {

    public final ClientService service;

    public ClientController(ClientService s) {
        this.service = s;
    }

    @GetMapping("/{id}")
    public ClientDTO getClient(@PathVariable Long id) {
        return ResponseEntity.ok(service.getClient(id));
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
