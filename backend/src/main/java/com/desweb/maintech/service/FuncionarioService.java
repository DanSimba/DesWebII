package com.desweb.maintech.service;

import static com.desweb.maintech.entity.TypeUser.FUNCIONARIO;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.desweb.maintech.dto.FuncionarioDTO;
import com.desweb.maintech.dto.UserDTO;
import com.desweb.maintech.entity.Funcionario;
import com.desweb.maintech.entity.TypeUser;
import com.desweb.maintech.entity.User;
import com.desweb.maintech.repository.FuncionarioRepository;
import com.desweb.maintech.repository.UserRepository;
import com.desweb.maintech.security.HashUtil;

@Service
public class FuncionarioService {
    private final FuncionarioRepository repository;
    private final UserRepository userRepository;

    public FuncionarioService(FuncionarioRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public FuncionarioDTO converterParaDTO(Funcionario funcionario) {
        FuncionarioDTO dto = new FuncionarioDTO();
        dto.setId(funcionario.getId());
        dto.setNome(funcionario.getNome());
        dto.setDataNascimento(funcionario.getDataNascimento());
        dto.setCargoFuncionario(funcionario.getCargoFuncionario());
        return dto;
    }

    public List<FuncionarioDTO> listar(){
        return repository.findAll().stream()
            .filter(Funcionario::isAtivo)
            .map(this::converterParaDTO)
            .collect(Collectors.toList());
    }

    public FuncionarioDTO buscarPorId(Long id) {
        Funcionario funcionario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("FUNCIONARIO NÃO ENCONTRADO!!!"));
        return this.converterParaDTO(funcionario);
    }

    public FuncionarioDTO buscarPorEmail(String email){
        Funcionario funcionario = repository.findByUserEmail(email)
            .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
        return this.converterParaDTO(funcionario);
    }

    public FuncionarioDTO salvar(FuncionarioDTO dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        String salt = HashUtil.gerarSalt();
        user.setSalt(salt);
        user.setPassword(HashUtil.hashSenha(dto.getSenha(), salt));
        user.setTypeUser(TypeUser.FUNCIONARIO);
        user = userRepository.save(user);
    
        // 2. Cria o Funcionario vinculado ao User
        Funcionario novo = new Funcionario();
        novo.setNome(dto.getNome());
        novo.setDataNascimento(dto.getDataNascimento());
        novo.setCargoFuncionario(dto.getCargoFuncionario());
        novo.setUser(user); // vincula ao user criado
        repository.save(novo);
    
        return converterParaDTO(novo);
    }

    public FuncionarioDTO atualizar(Long id, FuncionarioDTO dto) {
        Funcionario funcionario = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("FUNCIONARIO NÃO ENCONTRADO"));

        if (repository.existsByNomeIgnoreCaseAndIdNot(dto.getNome(), id)) {
            throw new IllegalArgumentException("Este nome já está sendo usado");
        }

        funcionario.setNome(dto.getNome());
        funcionario.setDataNascimento(dto.getDataNascimento());
        funcionario.setCargoFuncionario(dto.getCargoFuncionario());
        Funcionario funcionarioAtualizado = repository.save(funcionario);
        return converterParaDTO(funcionarioAtualizado); 
    }

    public void remover(Long id) {
        Funcionario funcionario = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("FUNCIONARIO NÃO ENCONTRADO"));
        funcionario.setAtivo(false);
        repository.save(funcionario);
    }
}
