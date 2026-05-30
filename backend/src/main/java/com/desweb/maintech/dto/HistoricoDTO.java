package com.desweb.maintech.dto;

import java.time.LocalDateTime;

import com.desweb.maintech.entity.EstadoSolicitacao;

public class HistoricoDTO {
    private Long id;
    private LocalDateTime dataHora;
    private String observacao;
    private EstadoSolicitacao estadoAnterior;
    private EstadoSolicitacao estadoNovo;
    private String nomeFuncionario;

    // Getters
    public Long getId(){
        return this.id;
    }

    public LocalDateTime getDataHora(){
        return this.dataHora;
    }

    public String getObservacao(){
        return this.observacao;
    }


    public String getNomeFuncionario() {
        return nomeFuncionario;
    }

    // Setters

    public void setId(Long i){
        this.id = i;
    }

    public void setDataHora(LocalDateTime dh){
        this.dataHora = dh;
    }

    public void setObservacao(String o){
        this.observacao = o;
    }

    public void setNomeFuncionario(String nomeFuncionario) {
        this.nomeFuncionario = nomeFuncionario;
    }
    public EstadoSolicitacao getEstadoAnterior() {
        return estadoAnterior;
    }

    public void setEstadoAnterior(EstadoSolicitacao estadoAnterior) {
        this.estadoAnterior = estadoAnterior;
    }

    public EstadoSolicitacao getEstadoNovo() {
        return estadoNovo;
    }

    public void setEstadoNovo(EstadoSolicitacao estadoNovo) {
        this.estadoNovo = estadoNovo;
    }

}
