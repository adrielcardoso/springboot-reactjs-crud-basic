package com.example.univali.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Agenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_agenda;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_servico")
    private Servico servico;

    private Date data_agendamento;
    private String horario;
    private String status;

    // Getters and Setters

    public Long getId_agenda() {
        return id_agenda;
    }

    public void setId_agenda(Long id_agenda) {
        this.id_agenda = id_agenda;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Servico getServico() {
        return servico;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    public Date getData_agendamento() {
        return data_agendamento;
    }

    public void setData_agendamento(Date data_agendamento) {
        this.data_agendamento = data_agendamento;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
