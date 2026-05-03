package com.desweb.maintech.dto;

import java.time.LocalDateTime;

public class HistoricoDTO {
    private Long id;
    private LocalDateTime dataHora;
    private String observacao;

    //Getters

    public Long getId(){
        return id;
    }

    public LocalDateTime getDataHora(){
        return dataHora;
    }

    public String getObservacao(){
        return observacao;
    }

}
