package main.java.maintec.dto;

import java.util.List;

public class ClientDTO {
    private Long id;
    private String nome;
    private List<SolicitationDTO> sols;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<SolicitationDTO> getSols() {
        return sols;
    }

    public void setSols(List<SolicitationDTO> sols) {
        this.sols = sols;
    }
}
