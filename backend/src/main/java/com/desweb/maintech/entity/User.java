package com.desweb.maintech.entity;

@Entity
public class User {
    //login
    @Id
    @GeneratedValue
    private Long id;

    private String email;
    private String password;

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String p){ //sempre passar um .encode("senha")
        this.password = p;
    }
}
