package main.java.maintec.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CategoriaDTO {
    private Long id;
    @NotBlank(message = "O nome da categoria não pode estar vazio.")
    @Size(min = 2, max = 50, message = "O nome deve ter entre 2 e 50 caracteres.")
    private String nome;

    //Getters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    //Setters

    public void setId(Long i) {
        this.id = i;
    }

    public void setNome(String n) {
        this.nome = n;
    }
}
