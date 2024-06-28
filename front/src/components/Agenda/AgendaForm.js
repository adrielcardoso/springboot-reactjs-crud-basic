import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import api from '../../services/api';

const AgendaForm = ({ agendaId, onClearSelectedAgenda, onReloadAgendas, show, handleClose }) => {
  const [agenda, setAgenda] = useState({
    cliente: '',
    servico: '',
    data_agendamento: '',
    horario: '',
    status: ''
  });
  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    // Carregar clientes e serviços
    api.get('/clientes')
      .then(response => setClientes(response.data))
      .catch(error => console.error(error));

    api.get('/servicos')
      .then(response => setServicos(response.data))
      .catch(error => console.error(error));

    // Se houver um ID de agenda, carregar dados da agenda
    if (agendaId) {
      api.get(`/agendas/${agendaId}`)
        .then(response => {
          const data = response.data;
          setAgenda({
            ...data,
            data_agendamento: data.data_agendamento ? new Date(data.data_agendamento).toISOString().split('T')[0] : ''
          });
        })
        .catch(error => console.error(error));
    } else {
      // Limpar o formulário se não houver agendaId
      setAgenda({
        cliente: '',
        servico: '',
        data_agendamento: '',
        horario: '',
        status: ''
      });
    }
  }, [agendaId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cliente') {
      const selectedCliente = clientes.find(cliente => cliente.id_cliente === parseInt(value));
      setAgenda({
        ...agenda,
        cliente: selectedCliente
      });
    } else if (name === 'servico') {
      const selectedServico = servicos.find(servico => servico.id_servico === parseInt(value));
      setAgenda({
        ...agenda,
        servico: selectedServico
      });
    } else {
      setAgenda({
        ...agenda,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowUpdateModal(true);
  };

  const confirmUpdate = () => {
    const request = agendaId ? api.put(`/agendas/${agendaId}`, agenda) : api.post('/agendas', agenda);

    request
      .then(response => {
        setMessage('Agendamento salvo com sucesso!');
        setError('');
        onClearSelectedAgenda();
        onReloadAgendas();
      })
      .catch(error => {
        setMessage('');
        setError('Erro ao salvar o agendamento.');
        console.error(error);
      });
    setShowUpdateModal(false);
  };

  return (
    <>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Cliente:</Form.Label>
          <Form.Control as="select" name="cliente" value={agenda.cliente.id_cliente || ''} onChange={handleChange}>
            <option value="">Selecione um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id_cliente} value={cliente.id_cliente}>{cliente.nome}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Serviço:</Form.Label>
          <Form.Control as="select" name="servico" value={agenda.servico.id_servico || ''} onChange={handleChange}>
            <option value="">Selecione um serviço</option>
            {servicos.map(servico => (
              <option key={servico.id_servico} value={servico.id_servico}>{servico.descricao}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Data de Agendamento:</Form.Label>
          <Form.Control type="date" name="data_agendamento" value={agenda.data_agendamento} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Horário:</Form.Label>
          <Form.Control type="time" name="horario" value={agenda.horario} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Status:</Form.Label>
          <Form.Control as="select" name="status" value={agenda.status} onChange={handleChange}>
            <option value="">Selecione um status</option>
            <option value="Aguardando">Aguardando</option>
            <option value="Fazendo">Fazendo</option>
            <option value="Feito">Feito</option>
            <option value="Cancelado">Cancelado</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Salvar</Button>
      </Form>

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar {agendaId ? 'Atualização' : 'Criação'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja {agendaId ? 'atualizar' : 'criar'} este agendamento?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmUpdate}>
            {agendaId ? 'Atualizar' : 'Criar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AgendaForm;
