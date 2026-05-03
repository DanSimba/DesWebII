package com.desweb.maintech.dto;

import java.time.LocalDateTime;

public class HistoricoDTO {
    private Long id;
    private LocalDateTime dataHora;
    private String observacao;

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
