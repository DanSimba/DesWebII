package com.desweb.maintech.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "historico_solicitacao")
public class Historico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_hora")
    private LocalDateTime dataHora;

    private String observacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_anterior")
    private EstadoSolicitacao estadoAnterior;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_novo")
    private EstadoSolicitacao estadoNovo;

    @ManyToOne
    @JoinColumn(name = "id_solicitacao")
    private Solicitation solicitacao;

    @ManyToOne
    @JoinColumn(name = "id_funcionario")
    private Funcionario funcionario;

    // Construtor sem parâmetros
    public Historico(){

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

    public EstadoSolicitacao getEstadoAnterior(){
        return this.estadoAnterior;
    }

    public EstadoSolicitacao getEstadoNovo(){
        return this.estadoNovo;
    }
}
