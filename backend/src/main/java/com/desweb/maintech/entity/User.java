package com.desweb.maintech.entity;

import java.util.Date;
import jakarta.persistence.*;

@Entity
public class User {
    //login
    @Id
    @GeneratedValue
    private Long id = new Date().getTime();

    private String email;
    private String password;

    @OneToOne(mappedBy = "user")
    private Funcionario funcionario;

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String p){ //sempre passar um .encode("senha")
        this.password = p;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Long getId() {
        return id;
    }
}
