package main.java.maintec.controller;

import org.springframework.web.bind.annotation.*;

import main.java.maintec.dto.ClientDTO;
import main.java.maintec.service.ClientService;

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
}
