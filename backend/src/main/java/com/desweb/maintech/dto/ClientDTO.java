package com.desweb.maintech.dto;

import java.util.ArrayList;
import java.util.List;

public class ClientDTO {
    private Long id;
    private String nome;
    private List<SolicitationDTO> sols= new ArrayList<>();

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
}
