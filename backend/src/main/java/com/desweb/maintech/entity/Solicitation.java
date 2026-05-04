package com.desweb.maintech.entity;

import java.util.Date;

import jakarta.persistence.Entity; //bd
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Solicitation {

    @Id
    private Long id = new Date().getTime();
    private String equipamento;
    private String desc;
    private String data;
    private String estado;


    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "solicitacao")
    private Historico historico;

    public long getId(){
        return this.id;
    }

    public String getDesc(){
        return this.desc;
    }

    public String getEquip(){
        return this.equipamento;
    }

    public String getData(){
        return this.data;
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
        this.desc = e;
    }

    public void setData(String e){
        this.data = e;
    }

    public void setEst(String e){
        this.estado = e;
    }
}
