package com.desweb.maintech.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desweb.maintech.dto.ClientDTO;
import com.desweb.maintech.service.AuthService;
import com.desweb.maintech.service.ClientService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService service;
    private final ClientService clientService;

    public AuthController(AuthService s, ClientService clientService) {
        this.service = s;
        this.clientService = clientService;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String token = service.login(
                body.get("email"),
                body.get("password")
        );

        return Map.of("token", token);
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> criar(@RequestBody ClientDTO dto) {
        try {
            ClientDTO novo = clientService.save(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(novo);
        } catch (Exception e) {

            if (e.getMessage().contains("cliente_cpf_key")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("CPF já cadastrado");
            }

            if (e.getMessage().contains("usuario_email_key")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado");
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro de integridade dos dados.");
        }

    }
}
