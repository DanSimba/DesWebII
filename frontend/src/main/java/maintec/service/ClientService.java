package main.java.maintec.service;

import java.util.List;

import main.java.maintec.dto.ClientDTO;
import main.java.maintec.repository.ClientRepository;

@Service
public class ClientService {

    private final ClientRepository rep;

    public ClientService(ClientRepository r) {
        this.rep = r;
    }

    public ClientDTO toDTO(Client client) {
            ClientDTO dto = new ClientDTO();
            dto.setId(client.getId());
            dto.setNome(client.getNome());

            List<SolicitationDTO> sols = client.getSols() //coloca as sols do client uma por uma 
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

    public ClientDTO getClient(Long id){
        Client c = repository.findById(id);
        if(!c) throw new RuntimeException("EXCEPTION!!! CLIENTE NÃO ENCONTARDO!!!");

        return this.toDTO(c);
    }
}
