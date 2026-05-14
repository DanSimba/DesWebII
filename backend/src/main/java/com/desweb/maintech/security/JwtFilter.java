package com.desweb.maintech.security;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
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

        if (header != null && header.startsWith("Bearer ")) {
        String token = header.substring(7);
        try {
            String email = jwtService.extractEmail(token);
            if (email != null) {
                UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(email, null, List.of());
                SecurityContextHolder.getContext().setAuthentication(auth);
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
        return path.startsWith("/auth/") ||
            path.startsWith("/public/") ||
            path.startsWith("/v3/api-docs") ||
            path.startsWith("/swagger-ui");
    }
}
