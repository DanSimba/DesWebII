package com.desweb.maintech.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SenhaService {

    @Autowired
    private EmailService emailService;

    public String gerarSenha() {
        return String.format("%04d", (int) (Math.random() * 10000));
    }

    public void informarSenha(String senha, String email){
        emailService.enviarEmail(
            email,
            "Senha gerada",
            "A senha gerada foi: " + senha
        );
    }
}
