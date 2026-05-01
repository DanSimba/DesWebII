package com.desweb.maintech.controller;

import main.java.com.desweb.maintech.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService s) {
        this.service = s;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String token = service.login(
                body.get("email"),
                body.get("password")
        );

        return Map.of("token", token);
    }
}
