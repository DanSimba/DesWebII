package com.desweb.maintech.dto;

import com.desweb.maintech.entity.TypeUser;


public class UserDTO {
    private Long id;

    private String email;
    private String password;
    private TypeUser typeUser;
    private String salt;

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setTypeUser(TypeUser typeUser) {
        this.typeUser = typeUser;
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

    public void setSalt(String salt) {
        this.salt = salt;
    }
}