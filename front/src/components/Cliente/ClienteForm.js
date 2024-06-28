import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import api from '../../services/api';

const ClienteForm = ({ clienteId, onClearSelectedCliente, onReloadClientes }) => {
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    data_nascimento: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    if (clienteId) {
      api.get(`/clientes/${clienteId}`)
        .then(response => setCliente(response.data))
        .catch(error => console.error(error));
    } else {
      setCliente({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        data_nascimento: ''
      });
    }
  }, [clienteId]);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    const request = clienteId ? api.put(`/clientes/${clienteId}`, cliente) : api.post('/clientes', cliente);

    request
      .then(response => {
        setMessage('Cliente salvo com sucesso!');
        setError('');
        onClearSelectedCliente();
        onReloadClientes();
      })
      .catch(error => {
        setMessage('');
        setError('Erro ao salvar o cliente.');
        console.error(error);
      });
    setShowSaveModal(false);
  };

  return (
    <>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nome:</Form.Label>
          <Form.Control type="text" name="nome" value={cliente.nome} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={cliente.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Telefone:</Form.Label>
          <Form.Control type="text" name="telefone" value={cliente.telefone} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Endereço:</Form.Label>
          <Form.Control type="text" name="endereco" value={cliente.endereco} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Data de Nascimento:</Form.Label>
          <Form.Control type="date" name="data_nascimento" value={cliente.data_nascimento} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Salvar</Button>
      </Form>

      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar {clienteId ? 'Atualização' : 'Criação'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja {clienteId ? 'atualizar' : 'criar'} este cliente?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={confirmSave}>{clienteId ? 'Atualizar' : 'Criar'}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClienteForm;
