package com.desweb.maintech.dto;

import java.time.LocalDateTime;

import com.desweb.maintech.entity.EstadoSolicitacao;

public class SolicitationDTO {
    private Long id;
    private String equipamento;
    private String desc;
    private LocalDateTime data;
    private EstadoSolicitacao estado;
    private String nomeCliente;

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

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

    public void setEst(EstadoSolicitacao e){
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

    public EstadoSolicitacao getEst(){
        return this.estado;
    }
}
