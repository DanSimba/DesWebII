package com.desweb.maintech.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.desweb.maintech.dto.CategoriaDTO;
import com.desweb.maintech.entity.Categoria;
import com.desweb.maintech.repository.CategoriaRepository;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<CategoriaDTO> listarTodas() {
        return repository.findByAtivoTrue().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }


    public CategoriaDTO buscarPorId(Long id) {
        Categoria categoria = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada!"));
        
        if (categoria.getAtivo() != null && !categoria.getAtivo()) {
            throw new RuntimeException("Categoria desativada!");
        }
        return converterParaDTO(categoria);
    }

    public CategoriaDTO salvar(CategoriaDTO dto) {
        if (repository.existsByNomeIgnoreCase(dto.getNome())) {
            throw new IllegalArgumentException("Já existe uma categoria com este nome.");
        }

        Categoria categoria = new Categoria();
        categoria.setNome(dto.getNome());
        categoria.setAtivo(true); 
        
        Categoria categoriaSalva = repository.save(categoria);
        return converterParaDTO(categoriaSalva);
    }

    public CategoriaDTO atualizar(Long id, CategoriaDTO dto) {
        Categoria categoria = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada!"));
        
        if (repository.existsByNomeIgnoreCaseAndIdNot(dto.getNome(), id)) {
            throw new IllegalArgumentException("Este nome já está sendo usado.");
        }
        
        categoria.setNome(dto.getNome());
        Categoria categoriaAtualizada = repository.save(categoria);
        return converterParaDTO(categoriaAtualizada);
    }

    public void desativar(Long id) {
        Categoria categoria = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada!"));
        
        categoria.setAtivo(false);
        repository.save(categoria);
    }

    private CategoriaDTO converterParaDTO(Categoria categoria) {
        CategoriaDTO dto = new CategoriaDTO();
        dto.setId(categoria.getId());
        dto.setNome(categoria.getNome());
        return dto;
    }
}