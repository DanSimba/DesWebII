package com.desweb.maintech.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.*;

@Entity
@Table(name = "solicitacao")
public class Solicitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "desc_defeito")
    private String descDefeito;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX") //pro spring saber como converter a string data que chega
    @Column(name = "data_hora")
    private LocalDateTime dataHora; 

    @Column(name = "orientacoes_cliente")
    private String orientacao;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "estado", columnDefinition = "estado_solicitacao")
    private EstadoSolicitacao estado;

    private String equipamento;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "id_func_destino")
    private Funcionario funcionario;

    @OneToMany(mappedBy = "solicitacao")
    private List<Historico> historico;

    //Getters
    public Long getId(){
        return this.id;
    }

    public String getDesc(){
        return this.descDefeito;
    }

    public String getEquip(){
        return this.equipamento;
    }

    public LocalDateTime getData(){
        return this.dataHora;
    }
    
    public Client getClient() {
        return client;
    }

    public String getOrientacao() {
        return this.orientacao;
    }

    public Funcionario getFuncionario() {
        return this.funcionario;
    }

     public EstadoSolicitacao getEst() {
        return this.estado;
    }

    public List<Historico> getHistorico() {
        return this.historico;
    }

    //Setters
    public void setId(Long i){
        this.id = i;
    }

    public void setEquip(String e){
        this.equipamento = e;
    }

    public void setDesc(String e){
        this.descDefeito = e;
    }

    public void setData(LocalDateTime e){
        this.dataHora = e;
    }

    public void setOrientacao(String e) {
        this.orientacao = e;
    }

    public void setEst(EstadoSolicitacao e) {
        this.estado = e;
    }

    public void setClient(Client c) {
        this.client = c;
    }

    public void setHistorico(List<Historico> h) {
        this.historico = h;
    }

    public void setFuncionario(Funcionario f) {
        this.funcionario = f;
    }
}
