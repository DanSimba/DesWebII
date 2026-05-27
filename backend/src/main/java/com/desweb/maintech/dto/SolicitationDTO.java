package com.desweb.maintech.dto;

import java.time.LocalDateTime;

import com.desweb.maintech.entity.EstadoSolicitacao;

public class SolicitationDTO {
    private Long id;
    private String equipamento;
    private String desc;
    private LocalDateTime data;
    private EstadoSolicitacao est; //pq no front tá tudo est pq em algum controller estava est e  esqueceram de mudar só aqui
    private Long idCliente; //vou trocar o nome pelo id pq no bd só pede id (mas seria interessante guardar direto o nome)

    public void setIdCliente(Long i) {
        this.idCliente = i;
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
        this.est = e;
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
        return this.est;
    }

    public Long getIdCliente() {
        return idCliente;
    }
}
