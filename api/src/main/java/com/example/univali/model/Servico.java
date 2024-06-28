package com.example.univali.model;

import javax.persistence.*;

@Entity
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_servico;

    private String descricao;
    private Double preco;

    // Getters and Setters

    public Long getId_servico() {
        return id_servico;
    }

    public void setId_servico(Long id_servico) {
        this.id_servico = id_servico;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }
}
