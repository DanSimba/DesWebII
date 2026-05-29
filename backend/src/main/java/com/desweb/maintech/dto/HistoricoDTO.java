package com.desweb.maintech.dto;

import java.time.LocalDateTime;

public class HistoricoDTO {
    private Long id;
    private LocalDateTime dataHora;
    private String observacao;
    private String estadoAnterior;
    private String estadoNovo;
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

    public String getEstadoAnterior() {
        return estadoAnterior;
    }

    public String getEstadoNovo() {
        return estadoNovo;
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

    public void setEstadoAnterior(String estadoAnterior) {
        this.estadoAnterior = estadoAnterior;
    }

    public void setEstadoNovo(String estadoNovo) {
        this.estadoNovo = estadoNovo;
    }

    public void setNomeFuncionario(String nomeFuncionario) {
        this.nomeFuncionario = nomeFuncionario;
    }
}
