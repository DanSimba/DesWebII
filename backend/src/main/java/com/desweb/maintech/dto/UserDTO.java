package com.desweb.maintech.dto;

import com.desweb.maintech.entity.Endereco;
import com.desweb.maintech.entity.TypeUser;


public class UserDTO {
    private Long id;

    private String cpf;
    private String nome;
    private String email;
    private String telefone;
    private String password;
    private Endereco endereco;
    private TypeUser typeUser;

    public void setId(Long id) {
        this.id = id;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }
    
    public void setTypeUser(TypeUser typeUser) {
        this.typeUser = typeUser;
    }

    public Long getId() {
        return id;
    }

    public String getCpf() {
        return cpf;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public TypeUser getTypeUser() {
        return typeUser;
    }

    //Lidando com a senha
    public void setPassword(String p) { //sempre passar um .encode("senha")
        this.password = p;
    }

    public String getPassword() {
        return password;
    }
}