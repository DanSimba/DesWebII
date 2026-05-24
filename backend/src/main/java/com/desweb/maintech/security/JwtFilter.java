package com.desweb.maintech.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        System.out.println("JWT FILTER EXECUTOU");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                String email = jwtService.extractEmail(token);
                String perfil = jwtService.extractPerfil(token);

                if (email != null && perfil != null) {
                    List<GrantedAuthority> authRole
                            = List.of(
                                    new SimpleGrantedAuthority("ROLE_" + perfil)
                            );

                    UsernamePasswordAuthenticationToken auth
                            = new UsernamePasswordAuthenticationToken(email, null, authRole);

                    SecurityContextHolder.getContext().setAuthentication(auth);
                    //quero ver n achar essa bosta agr
                    System.out.println("EMAIL: " + email);
                    System.out.println("PERFIL: " + perfil);
                    System.out.println("AUTHS: " + auth);
                }
            } catch (Exception e) {
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/auth/")
                || path.startsWith("/public/")
                || path.startsWith("/v3/api-docs")
                || path.startsWith("/swagger-ui");
    }

    //testando um bagulho do GPT - COMEÇA AQUI
   
    //TERMINA AQUI - !!
}
