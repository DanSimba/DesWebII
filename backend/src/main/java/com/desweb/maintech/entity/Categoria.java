package com.desweb.maintech.entity;

import java.util.Date;

import jakarta.persistence.*;

@Entity
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String nome;

    private Boolean ativo = true;
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }

    // Construtor sem parâmetros
    public Categoria(){

    }

    // Getters
    public Long getId(){
        return this.id;
    }

    public String getNome(){
        return this.nome;
    }

    // Setters
    public void setId(Long i){
        this.id = i;
    }

    public void setNome(String n){
        this.nome = n;
    }
}
