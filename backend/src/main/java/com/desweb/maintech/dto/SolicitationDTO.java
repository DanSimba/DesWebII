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

    private String nomeCliente; // dados do nosso mano cliente pra puxar no front
    private String cpfCliente;
    private String emailCliente;

    private String nomeCategoria; //uma solicitação sem categoria, gostoso demais 

    private String motivoRej;
    private Long idFuncDestino; //pra redirecionar essa bomba depois

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

    public void setMotivoRej(String motivoRej) {
        this.motivoRej = motivoRej;
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

    public String getMotivoRej() {
        return motivoRej;
    }

    public void setNomeCliente(String n) { this.nomeCliente = n; }
    public void setCpfCliente(String c) { this.cpfCliente = c; }
    public void setEmailCliente(String e) { this.emailCliente = e; }
    public void setNomeCategoria(String n) { this.nomeCategoria = n; }
    public String getNomeCliente() { return nomeCliente; }
    public String getCpfCliente() { return cpfCliente; }
    public String getEmailCliente() { return emailCliente; }
    public String getNomeCategoria() { return nomeCategoria; }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEquipamento() {
        return equipamento;
    }

    public void setEquipamento(String equipamento) {
        this.equipamento = equipamento;
    }

    public Long getIdFuncDestino() {
        return idFuncDestino;
    }

    public void setIdFuncDestino(Long idFuncDestino) {
        this.idFuncDestino = idFuncDestino;
    }

}
