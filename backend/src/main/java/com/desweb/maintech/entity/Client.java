package com.desweb.maintech.entity;

import java.util.ArrayList; //bd
import java.util.List;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cliente")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String cpf;

    private String telefone;

    @OneToMany(mappedBy = "client")
    private List<Solicitation> sols = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "id_usuario")
    private User user;

    @Embedded
    private Endereco endereco;

    public long getId() {
        return this.id;
    }

    public String getNome() {
        return this.nome;
    }

    public List<Solicitation> getSols() {
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

    public void addToSols(Solicitation s) {
        this.sols.add(s);
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}
