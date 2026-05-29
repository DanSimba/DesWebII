package com.desweb.maintech.dto;

import java.time.LocalDateTime;

public class HistoricoDTO {
    private Long id;
    private LocalDateTime dataHora;
    private String observacao;
    private String estadoAnterior;
    private String estadoNovo;
    private String nomeFuncionario;

    public String getEstadoAnterior() {
        return estadoAnterior;
    }

    public void setEstadoAnterior(String estadoAnterior) {
        this.estadoAnterior = estadoAnterior;
    }

    public String getEstadoNovo() {
        return estadoNovo;
    }

    public void setEstadoNovo(String estadoNovo) {
        this.estadoNovo = estadoNovo;
    }

    public String getNomeFuncionario() {
        return nomeFuncionario;
    }

    public void setNomeFuncionario(String nomeFuncionario) {
        this.nomeFuncionario = nomeFuncionario;
    }

    //Getters
    public Long getId(){
        return this.id;
    }

    public LocalDateTime getDataHora(){
        return this.dataHora;
    }

    public String getObservacao(){
        return this.observacao;
    }

}
