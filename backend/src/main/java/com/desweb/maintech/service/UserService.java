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

    public void register(UserDTO dto) {

        String salt = HashUtil.gerarSalt(); // Gera o salt
        // Envia a senha e o salt para gerar o que vai ser salvo como senha
        String senhaHash = HashUtil.hashSenha(dto.getPassword(), salt);

        //Cria o usuario;
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(senhaHash);
        user.setTypeUser(dto.getTypeUser());
        user.setSalt(salt);// É preciso salvar o salt gerado aleatorio para validar depois


        repository.save(user);
    }
}