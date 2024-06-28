package com.example.univali.controller;

import com.example.univali.model.Cliente;
import com.example.univali.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cliente createCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente clienteDetails) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        if (cliente.isPresent()) {
            Cliente updatedCliente = cliente.get();
            updatedCliente.setNome(clienteDetails.getNome());
            updatedCliente.setEmail(clienteDetails.getEmail());
            updatedCliente.setTelefone(clienteDetails.getTelefone());
            updatedCliente.setEndereco(clienteDetails.getEndereco());
            return ResponseEntity.ok(clienteRepository.save(updatedCliente));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCliente(@PathVariable Long id) {
        try {
            if (clienteRepository.existsById(id)) {
                clienteRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(409).body("Erro ao excluir cliente: violação de chave estrangeira.");
        }
    }
}
