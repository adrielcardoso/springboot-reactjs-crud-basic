package com.example.univali.controller;

import com.example.univali.model.Agenda;
import com.example.univali.repository.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agendas")
public class AgendaController {

    @Autowired
    private AgendaRepository agendaRepository;

    @GetMapping
    public List<Agenda> getAllAgendas() {
        return agendaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agenda> getAgendaById(@PathVariable Long id) {
        Optional<Agenda> agenda = agendaRepository.findById(id);
        return agenda.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Agenda createAgenda(@RequestBody Agenda agenda) {
        return agendaRepository.save(agenda);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agenda> updateAgenda(@PathVariable Long id, @RequestBody Agenda agendaDetails) {
        Optional<Agenda> agenda = agendaRepository.findById(id);
        if (agenda.isPresent()) {
            Agenda updatedAgenda = agenda.get();
            updatedAgenda.setCliente(agendaDetails.getCliente());
            updatedAgenda.setServico(agendaDetails.getServico());
            updatedAgenda.setHorario(agendaDetails.getHorario());
            updatedAgenda.setStatus(agendaDetails.getStatus());
            return ResponseEntity.ok(agendaRepository.save(updatedAgenda));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgenda(@PathVariable Long id) {
        if (agendaRepository.existsById(id)) {
            agendaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
