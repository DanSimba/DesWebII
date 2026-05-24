package com.desweb.maintech.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.desweb.maintech.dto.FuncionarioDTO;
import com.desweb.maintech.entity.Funcionario;
import com.desweb.maintech.repository.FuncionarioRepository;

@Service
public class FuncionarioService {
    private final FuncionarioRepository repository;

    public FuncionarioService(FuncionarioRepository repository) {
        this.repository = repository;
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
            .map(this::converterParaDTO)
            .collect(Collectors.toList());
    }

    public FuncionarioDTO buscarPorId(Long id) {
        Funcionario funcionario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("FUNCIONARIO NÃO ENCONTRADO!!!"));
        return this.converterParaDTO(funcionario);
    }

    public FuncionarioDTO salvar(FuncionarioDTO dto) {
        Funcionario novo = new Funcionario();
        novo.setId(dto.getId());
        novo.setNome(dto.getNome());
        novo.setDataNascimento(dto.getDataNascimento());
        novo.setCargoFuncionario(dto.getCargoFuncionario());

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
        repository.delete(funcionario);
    }
}
