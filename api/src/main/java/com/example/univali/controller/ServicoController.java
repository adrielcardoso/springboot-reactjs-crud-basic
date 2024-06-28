package com.example.univali.controller;

import com.example.univali.model.Servico;
import com.example.univali.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/servicos")
public class ServicoController {

    @Autowired
    private ServicoRepository servicoRepository;

    @GetMapping
    public List<Servico> getAllServicos() {
        return servicoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servico> getServicoById(@PathVariable Long id) {
        Optional<Servico> servico = servicoRepository.findById(id);
        return servico.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Servico createServico(@RequestBody Servico servico) {
        return servicoRepository.save(servico);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> updateServico(@PathVariable Long id, @RequestBody Servico servicoDetails) {
        Optional<Servico> servico = servicoRepository.findById(id);
        if (servico.isPresent()) {
            Servico updatedServico = servico.get();
            updatedServico.setDescricao(servicoDetails.getDescricao());
            updatedServico.setPreco(servicoDetails.getPreco());
            return ResponseEntity.ok(servicoRepository.save(updatedServico));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteServico(@PathVariable Long id) {
        try {
            if (servicoRepository.existsById(id)) {
                servicoRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(409).body("Erro ao excluir cliente: violação de chave estrangeira.");
        }
    }
}
