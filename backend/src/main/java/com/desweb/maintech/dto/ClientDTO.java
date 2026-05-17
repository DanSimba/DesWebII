package com.desweb.maintech.dto;

import java.util.ArrayList;
import java.util.List;

import com.desweb.maintech.entity.Client;

//import com.desweb.maintech.entity.User;
public class ClientDTO {

    private Long id;
    private String cpf;
    private String nome;
    private String email; //cliente nem tem email pq q tem isso aq
    private String telefone;

    private EnderecoDTO endereco;

    private List<SolicitationDTO> sols = new ArrayList<>();

    public ClientDTO(Client c){
        this.setId(c.getId());
        this.setCpf(c.getCpf());
        this.setNome(c.getNome());
        this.setTelefone(c.getTelefone());
        //this.setEndereco(c.getEndereco()); //isso n retorna um endereçoDTO e eu que n vou ver essa pika agr
    }

    public ClientDTO(){};

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
