package com.example.univali.repository;

import com.example.univali.model.Agenda;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {
    @Override
    @EntityGraph(attributePaths = {"cliente", "servico"})
    List<Agenda> findAll();
}
