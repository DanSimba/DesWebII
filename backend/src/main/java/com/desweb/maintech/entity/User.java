package com.desweb.maintech.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class User {

    //login
    @Id
    @GeneratedValue
    private Long id = new Date().getTime();

    private String email;
    private String password;
    private TypeUser typeUser;
    private String salt;

    @OneToOne(mappedBy = "user")
    private Funcionario funcionario;

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setTypeUser(TypeUser typeUser) {
        this.typeUser = typeUser;
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
        return typeUser;
    }

    //Lidando com a senha
    public void setPassword(String p) { //sempre passar um .encode("senha")
        this.password = p;
    }

    public String getPassword() {
        return password;
    }

    public String getSalt() {
        return salt;
    }

}
