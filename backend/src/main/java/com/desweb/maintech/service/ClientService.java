package com.desweb.maintech.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import java.util.Optional;

import com.desweb.maintech.dto.ClientDTO;
import com.desweb.maintech.dto.SolicitationDTO;
import com.desweb.maintech.dto.UserDTO;
import com.desweb.maintech.entity.Client;
import com.desweb.maintech.entity.Endereco;
import static com.desweb.maintech.entity.TypeUser.CLIENTE;
import com.desweb.maintech.entity.User;
import com.desweb.maintech.repository.ClientRepository;

@Service
public class ClientService {

    private UserService userS;
    private final ClientRepository repository;

    public ClientService(ClientRepository repository, UserService userS) {
        this.repository = repository;
        this.userS = userS;
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
            .orElseThrow(() ->
                new RuntimeException("CLIENTE NÃO ENCONTRADO")
            );
            
        return this.toDTO(client);
    }

    public List<ClientDTO> listClients() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ClientDTO save(ClientDTO dto) {

        UserDTO newUserDTO = new UserDTO();
        newUserDTO.setEmail(dto.getEmail());
        newUserDTO.setTypeUser(CLIENTE);
        User newUser = userS.register(newUserDTO);


        Client newCliente = new Client();
        
        newCliente.setUser(newUser);

        newCliente.setNome(dto.getNome());
        newCliente.setCpf(dto.getCpf());
        newCliente.setTelefone(dto.getTelefone());

        // endereço
        Endereco end = new Endereco();

        end.setCep(dto.getEndereco().getCep());
        end.setLogradouro(dto.getEndereco().getLogradouro());
        end.setNumero(dto.getEndereco().getNumero());
        end.setComplemento(dto.getEndereco().getComplemento());
        end.setBairro(dto.getEndereco().getBairro());
        end.setCidade(dto.getEndereco().getCidade());
        end.setEstado(dto.getEndereco().getEstado());

        newCliente.setEndereco(end);

        repository.save(newCliente);

        return toDTO(newCliente);
    }

    public ClientDTO findByEmail(String email) { //acha o abj client pelo email e cria o dto
        Client client = repository.findByUserEmail(email)
            .orElseThrow(() -> new RuntimeException("EXCEPTION!!! EMAIL NÃO ENCONTRADO!!!"));

        return new ClientDTO(client);
    }
}
