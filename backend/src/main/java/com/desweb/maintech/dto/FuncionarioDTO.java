package com.desweb.maintech.dto;

import java.time.LocalDate;

// importa uma ferramenta da biblioteca Jackson que ajuda a formatar como os dados serão transformados em JSON.
import com.fasterxml.jackson.annotation.JsonFormat;

public class FuncionarioDTO {
    private Long id;
    private String nome;
    private String cargoFuncionario;
    private String email;
    private String senha;

    // Quando o objeto for convertido para JSON, a data deve aparecer no formato brasileiro "dia/mês/ano"
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento;

    //Getters

    public Long getId(){
        return id;
    }

    public String getNome(){
        return nome;
    }

    public LocalDate getDataNascimento(){
        return dataNascimento;
    }

    public String getCargoFuncionario(){
        return cargoFuncionario;
    }

    //Setters

    public void setId(Long i){
        this.id = i;
    }

    public void setNome(String n){
        this.nome = n;
    }

    public void setDataNascimento(LocalDate dn){
        this.dataNascimento = dn;
    }

    public void setCargoFuncionario(String cf){
        this.cargoFuncionario = cf;
    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
