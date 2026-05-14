package com.desweb.maintech.dto;

import java.util.ArrayList;
import java.util.List;

//import com.desweb.maintech.entity.User;
public class ClientDTO {

    private Long id;
    private String cpf;
    private String nome;
    private String email;
    private String telefone;

    private EnderecoDTO endereco;

    private List<SolicitationDTO> sols = new ArrayList<>();

    public Long getId() {
        return this.id;
    }

    public String getNome() {
        return this.nome;
    }

    public List<SolicitationDTO> getSols() {
        return this.sols;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setSols(List<SolicitationDTO> sols) {
        this.sols = sols;
    }

    public EnderecoDTO getEndereco() {
        return endereco;
    }

    public void setEndereco(EnderecoDTO endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
