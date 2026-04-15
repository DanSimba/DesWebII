package main.java.maintec.entity;

import jakarta.persistence.*; //bd
import java.util.List;

@Entity
public class Client {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY) //stratégia pro bd criar id automaticamente (autoincrementa)
    private long id = new Date().getTime(); //gera baseado na data

    private String nome;
    @OneToMany(mappedBy = "client")
    private List<Solicitation> sols;

    public long getId(){
        return this.id;
    }

    public String getNome(){
        return this.nome;
    }

    public List<Solicitation> getSols(){
        return this.sols;
    } 
}
