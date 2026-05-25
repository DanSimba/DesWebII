package com.desweb.maintech.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String remetente;

    public String enviarEmail(String para, String assunto, String corpoEmail) {

        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(remetente);
            simpleMailMessage.setTo(para);
            simpleMailMessage.setSubject(assunto);
            simpleMailMessage.setText(corpoEmail);
            javaMailSender.send(simpleMailMessage);
            return "FOI";
        } catch (Exception e) {
            return "Erro ao enviar email" + e.getMessage();
        }
    }
}
