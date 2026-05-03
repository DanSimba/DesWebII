package com.desweb.maintech.dto;

import java.util.ArrayList;
import java.util.List;

public class ClientDTO {
    private Long id;
    private String nome;
    private List<SolicitationDTO> sols= new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getNome() {
            return nome;
        }

    public List<SolicitationDTO> getSols() {
        return sols;
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
