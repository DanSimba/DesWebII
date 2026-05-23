package com.desweb.maintech.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class User {
    //login
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "perfil")
    private TypeUser perfil;
    private String salt;

    //@OneToOne(mappedBy = "user")
    //private Funcionario funcionario;

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setTypeUser(TypeUser typeUser) {
        this.perfil = typeUser;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }


    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public TypeUser getTypeUser() {
        return perfil;
    }

    public void setPassword(String p) { //sempre passar um .encode("senha")
        this.senha = p;
    }

    public String getPassword() {
        return senha;
    }

    public String getSalt() {
        return salt;
    }

}
