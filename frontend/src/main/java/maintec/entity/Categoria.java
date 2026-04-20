package main.java.maintec.entity;

import jakarta.persistence.*;

@Entity
public class Categoria {

    @Id
    private Long id = new Date().getTime();

    @Column(nullable = false, length = 200)
    private String nome;

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
