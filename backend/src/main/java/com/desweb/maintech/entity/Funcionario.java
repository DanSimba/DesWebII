package com.desweb.maintech.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "funcionario")
public class Funcionario {
    @Id
    private Long id = new Date().getTime();

    @Column(nullable = false, length = 200)
    private String nome;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @OneToMany(mappedBy = "funcionario")
    private List<Historico>  historico;

    @OneToOne
    @JoinColumn(name = "id_usuario")
    private User user;

    public Funcionario(){

    }

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

    public List<Historico> getHistorico() {
        return this.historico;
    }

    public User getUser() {
        return user;
    }

    //Setters

    public void setId(Long id){
        this.id = id;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public void setDataNascimento(LocalDate dataNascimento){
        this.dataNascimento = dataNascimento;
    }

    public void setHistorico(List<Historico> historico) {
        this.historico = historico;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
