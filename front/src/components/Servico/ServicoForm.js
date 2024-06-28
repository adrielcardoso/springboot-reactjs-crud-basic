import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import api from '../../services/api';

const ServicoForm = ({ servicoId, onClearSelectedServico, onReloadServicos }) => {
  const [servico, setServico] = useState({
    descricao: '',
    preco: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    if (servicoId) {
      api.get(`/servicos/${servicoId}`)
        .then(response => setServico(response.data))
        .catch(error => console.error(error));
    } else {
      setServico({
        descricao: '',
        preco: ''
      });
    }
  }, [servicoId]);

  const handleChange = (e) => {
    setServico({
      ...servico,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    const request = servicoId ? api.put(`/servicos/${servicoId}`, servico) : api.post('/servicos', servico);

    request
      .then(response => {
        setMessage('Serviço salvo com sucesso!');
        setError('');
        onClearSelectedServico();
        onReloadServicos();
      })
      .catch(error => {
        setMessage('');
        setError('Erro ao salvar o serviço.');
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
          <Form.Label>Descrição:</Form.Label>
          <Form.Control type="text" name="descricao" value={servico.descricao} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Preço:</Form.Label>
          <Form.Control type="number" name="preco" value={servico.preco} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Salvar</Button>
      </Form>

      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar {servicoId ? 'Atualização' : 'Criação'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja {servicoId ? 'atualizar' : 'criar'} este serviço?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={confirmSave}>{servicoId ? 'Atualizar' : 'Criar'}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServicoForm;
