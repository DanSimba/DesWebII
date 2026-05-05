package com.desweb.maintech.entity;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "solicitacao")
public class Solicitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "desc_defeito")
    private String descDefeito;

    @Column(name = "data_hora")
    private LocalDateTime dataHora; 

    private String estado;
    private String equipamento;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Client client;

    @OneToMany(mappedBy = "solicitacao")
    private List<Historico> historico;

    public long getId(){
        return this.id;
    }

    public String getDesc(){
        return this.descDefeito;
    }

    public String getEquip(){
        return this.equipamento;
    }

    public LocalDateTime getData(){
        return this.dataHora;
    }

    public String getEst(){
        return this.estado;
    }

    public void setId(long i){
        this.id = i;
    }

    public void setEquip(String e){
        this.equipamento = e;
    }

    public void setDesc(String e){
        this.descDefeito = e;
    }

    public void setData(LocalDateTime e){
        this.dataHora = e;
    }

    public void setEst(String e){
        this.estado = e;
    }
}
