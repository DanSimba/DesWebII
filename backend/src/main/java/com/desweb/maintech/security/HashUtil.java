package com.desweb.maintech.security;

//Define o padrao de encode para UTF-8 controla acentuação e outro caracteres na senha
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;// Implementa o SHA-256
import java.security.SecureRandom;//Gera numero aleatorio para senha
import java.util.Base64;//Converte o hash para texto legivel

public class HashUtil {

    //Minha palavrinha especial para o Salt da senha (descobri que se chama pepper)
    private static final String SALT_FIXO = "ManutencoesKawaii";


    public static String gerarSalt() {
        byte[] salt = new byte[16];//Vetor de 16 bytes
        new SecureRandom().nextBytes(salt); // Preenche o vetor com valores aleatorios
        return Base64.getEncoder().encodeToString(salt);// Cpnverte para string para poder salvar
    }

    public static String hashSenha(String senha, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            String combinado = senha + salt + SALT_FIXO;//Junta tudo

            //Transforma a string combinada em bytes gera um vetor de bytes que é o hash    
            byte[] hash = md.digest(combinado.getBytes(StandardCharsets.UTF_8));

            return Base64.getEncoder().encodeToString(hash);//Converte novamente o hash para string

        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar hash", e);
        }
    }
}