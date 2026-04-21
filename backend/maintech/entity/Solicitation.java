package main.java.maintec.entity;

import jakarta.persistence.*; //bd
import java.util.List;

@Entity
public class Solicitation {

    @Id
    private long id = new Date().getTime();
    private String equipamento;
    private String desc;
    private String data;
    private String estado;


    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

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