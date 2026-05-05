package com.desweb.maintech.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.desweb.maintech.dto.ClientDTO;
import com.desweb.maintech.dto.SolicitationDTO;
import com.desweb.maintech.entity.Client;
import com.desweb.maintech.repository.ClientRepository;

@Service
public class ClientService {

    private final ClientRepository repository;

    public ClientService(ClientRepository repository) {
        this.repository = repository;
    }

    public ClientDTO toDTO(Client client) {
        ClientDTO dto = new ClientDTO();
        dto.setId(client.getId());
        dto.setNome(client.getNome());

        List<SolicitationDTO> sols = client.getSols() // coloca as sols do client uma por uma
                .stream()
                .map(sol -> {   
                    SolicitationDTO s = new SolicitationDTO();
                    s.setId(sol.getId());
                    s.setDesc(sol.getDesc());
                    s.setEquip(sol.getEquip());
                    s.setData(sol.getData());
                    s.setEst(sol.getEst());
                    return s;
                })
                .toList();

        dto.setSols(sols);
        return dto;
    }

    public ClientDTO getClient(Long id) {
        Client client = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("EXCEPTION!!! CLIENTE NÃO ENCONTRADO!!!"));
        return this.toDTO(client);
    }

    public List<ClientDTO> listClients() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ClientDTO save(ClientDTO dto) {
        Client novo = new Client();
        novo.setNome(dto.getNome());
        novo.setId(dto.getId());
        
        repository.save(novo);
        return toDTO(novo);
    }
}

