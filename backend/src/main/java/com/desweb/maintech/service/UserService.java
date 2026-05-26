package com.desweb.maintech.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desweb.maintech.dto.UserDTO;
import com.desweb.maintech.entity.User;
import com.desweb.maintech.repository.UserRepository;
import com.desweb.maintech.security.HashUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private SenhaService senhaService;

    public User register(UserDTO dto) {

        String senha = senhaService.gerarSenha(); 
        String email = dto.getEmail();

        String salt = HashUtil.gerarSalt(); // Gera o salt
        // Envia a senha e o salt para gerar o que vai ser salvo como senha
        String senhaHash = HashUtil.hashSenha(senha, salt);

        //Cria o usuario;
        User user = new User();
        user.setEmail(email);
        user.setPassword(senhaHash);
        user.setTypeUser(dto.getTypeUser());
        user.setSalt(salt);// É preciso salvar o salt gerado aleatorio para validar depois

        repository.save(user);
        senhaService.informarSenha(senha, email);
        return user;
    }
}