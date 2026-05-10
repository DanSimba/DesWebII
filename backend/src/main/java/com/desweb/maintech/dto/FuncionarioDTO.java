package com.desweb.maintech.dto;

import java.time.LocalDate;

// importa uma ferramenta da biblioteca Jackson que ajuda a formatar como os dados serão transformados em JSON.
import com.fasterxml.jackson.annotation.JsonFormat;

public class FuncionarioDTO {
    private Long id;
    private String nome;

    // Quando o objeto for convertido para JSON, a data deve aparecer no formato brasileiro "dia/mês/ano"
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
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
}
