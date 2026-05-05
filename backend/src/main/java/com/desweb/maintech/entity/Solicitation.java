package com.desweb.maintech.entity;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "solicitacao")
public class Solicitation {

    @Id
    private Long id = new Date().getTime();
    private String equipamento;
    private String desc_defeito;
    private LocalDateTime data_hora;
    private String estado;


    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "solicitacao")
    private List<Historico> historico;

    public long getId(){
        return this.id;
    }

    public String getDesc(){
        return this.desc_defeito;
    }

    public String getEquip(){
        return this.equipamento;
    }

    public LocalDateTime getData(){
        return this.data_hora;
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
        this.desc_defeito = e;
    }

    public void setData(LocalDateTime e){
        this.data_hora = e;
    }

    public void setEst(String e){
        this.estado = e;
    }
}
