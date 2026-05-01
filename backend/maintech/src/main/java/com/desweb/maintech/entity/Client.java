package main.java.maintec.entity;

import jakarta.persistence.*; //bd

import java.util.ArrayList;
import java.util.List;

@Entity
public class Client {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY) //stratégia pro bd criar id automaticamente (autoincrementa)
    private long id = new Date().getTime(); //gera baseado na data

    private String nome;
    @OneToMany(mappedBy = "client")
    private List<Solicitation> sols = new ArrayList<>();

    public long getId(){
        return this.id;
    }

    public String getNome(){
        return this.nome;
    }

    public List<Solicitation> getSols(){
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

    public void addToSols(Solicitation s){
        this.sols.add(s);
    }
}
