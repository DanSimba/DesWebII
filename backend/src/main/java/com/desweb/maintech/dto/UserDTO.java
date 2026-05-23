package com.desweb.maintech.dto;

import com.desweb.maintech.entity.TypeUser;

public class UserDTO {

    private Long id;

    private String email;
    private TypeUser typeUser;

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

}
