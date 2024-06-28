import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Modal, Alert } from 'react-bootstrap';
import api from '../../services/api';

const ServicoList = ({ onSelectServico, reload, onReloadServicos, onResetForm }) => {
  const [servicos, setServicos] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [servicoToDelete, setServicoToDelete] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/servicos')
      .then(response => setServicos(response.data))
      .catch(error => console.error(error));
  }, [reload]);

  const handleDelete = (id) => {
    api.delete(`/servicos/${id}`)
      .then(response => {
        console.log('Serviço excluído com sucesso');
        setError('');  // Limpar a mensagem de erro em caso de sucesso
        onReloadServicos();
        onResetForm();
      })
      .catch(error => {
        console.error('Erro ao excluir serviço:', error);
        setError(error.response?.data || 'Erro ao excluir serviço.');
      });
    setShowDeleteModal(false);
    setServicoToDelete(null);
  };

  const confirmDelete = (servico) => {
    setServicoToDelete(servico);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setServicoToDelete(null);
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup>
        {servicos.map(servico => (
          <ListGroup.Item key={servico.id_servico}>
            {servico.descricao} - {servico.preco}
            <Button
              variant="secondary"
              onClick={() => onSelectServico(servico)}
              style={{ marginLeft: '10px' }}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              onClick={() => confirmDelete(servico)}
              style={{ marginLeft: '10px' }}
            >
              Excluir
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja excluir o serviço?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancelar</Button>
          <Button variant="danger" onClick={() => handleDelete(servicoToDelete.id_servico)}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServicoList;
