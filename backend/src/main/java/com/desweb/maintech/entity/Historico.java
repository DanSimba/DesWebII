package com.desweb.maintech.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


import java.time.LocalDateTime;

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
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "estado_anterior", columnDefinition = "estado_solicitacao")
    private EstadoSolicitacao estadoAnterior;
    
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "estado_novo", columnDefinition = "estado_solicitacao")
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
    
    public Solicitation getSolicitacao() {
        return solicitacao;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    // Setters

    public void setId(Long i){
        this.id = i;
    }

    public void setSolicitacao(Solicitation solicitacao) {
        this.solicitacao = solicitacao;
    }

    public void setFuncionario(Funcionario f){
        this.funcionario = f;
    }

    
    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    // Tava faltando os setters de EstadoAnterior e EstadoNovo
    
    public void setEstadoAnterior(EstadoSolicitacao ea){
        this.estadoAnterior = ea;
    }

    public void setEstadoNovo(EstadoSolicitacao en){
        this.estadoNovo = en;
    }
}
