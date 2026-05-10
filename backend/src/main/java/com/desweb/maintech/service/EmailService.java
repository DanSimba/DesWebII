/*package com.desweb.maintech.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service    
public class EmailService {

    @Autowired
    private JavaMailSender email;

    public EmailService(JavaMailSender email) {
        this.email = email;
    }

    public void enviarEmail(String para, String assunto, String corpoEmail) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("gersonbeljr@gmail.com");
        message.setTo(para);
        message.setSubject(assunto);
        message.setText(corpoEmail);

        email.send(message);
    }
}*/