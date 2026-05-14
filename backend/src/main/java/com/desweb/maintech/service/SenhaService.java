package com.desweb.maintech.service;

import org.springframework.stereotype.Service;

@Service
public class SenhaService {

    public static String gerarSenha(){
        return (int)(Math.random()*10000) + "";
    }

    public static void informarSenha(String senha, String email){
    }
}