package main.java.maintec.dto;

import java.util.List;

public class SolicitationDTO {
    private Long id;
    private String equipamento;
    private String desc;
    private String data;
    private String estado;

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

    public void setData(String e){
        this.data = e;
    }

    public void setEst(String e){
        this.estado = e;
    }
}
