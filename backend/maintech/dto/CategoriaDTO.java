package main.java.maintec.dto;

public class CategoriaDTO {
    private Long id;
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
