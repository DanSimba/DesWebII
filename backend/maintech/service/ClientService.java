package main.java.maintec.service;

import main.java.maintec.dto.ClientDTO;
import main.java.maintec.dto.SolicitationDTO;
import main.java.maintec.entity.Client;
import main.java.maintec.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
}

