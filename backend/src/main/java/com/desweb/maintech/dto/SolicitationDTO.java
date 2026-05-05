package com.desweb.maintech.dto;

import java.time.LocalDateTime;

public class SolicitationDTO {
    private Long id;
    private String equipamento;
    private String desc;
    private LocalDateTime data;
    private String estado;

    //supostamente aqui eu só preciso dos setters certo?
    public void setId(long i){
        this.id = i;
    }

    public void setEquip(String e){
        this.equipamento = e;
    }

    public void setDesc(String e){
        this.desc = e;
    }

    public void setData(LocalDateTime e){
        this.data = e;
    }

    public void setEst(String e){
        this.estado = e;
    }

    public Long getId(){
        return this.id;
    }

    public String getEquip(){
        return this.equipamento;
    }

    public String getDesc(){
        return this.desc;
    }    

    public LocalDateTime getData(){
        return this.data;
    }

    public String getEst(){
        return this.estado;
    }
}
