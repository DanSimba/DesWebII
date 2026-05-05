package com.desweb.maintech.entity;

import java.util.ArrayList; //bd
import java.util.Date;
import java.util.List;
import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    @OneToMany(mappedBy = "client")
    private List<Solicitation> sols = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "id_usuario")
    private User user;

    @Embedded
    private Endereco endereco;

    public long getId(){
        return this.id;
    }

    public String getNome(){
        return this.nome;
    }

    public List<Solicitation> getSols(){
        return this.sols;
    } 

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setSols(List<Solicitation> sols) {
        this.sols = sols;
    }

    public void addToSols(Solicitation s){
        this.sols.add(s);
    }
}
