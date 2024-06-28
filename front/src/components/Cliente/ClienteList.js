import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Modal, Alert } from 'react-bootstrap';
import api from '../../services/api';

const ClienteList = ({ onSelectCliente, reload, onReloadClientes, onResetForm }) => {
  const [clientes, setClientes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/clientes')
      .then(response => setClientes(response.data))
      .catch(error => console.error(error));
  }, [reload]);

  const handleDelete = (id) => {
    api.delete(`/clientes/${id}`)
      .then(response => {
        console.log('Cliente excluído com sucesso');
        setError('');  // Limpar a mensagem de erro em caso de sucesso
        onReloadClientes();
        onResetForm();
      })
      .catch(error => {
        console.error('Erro ao excluir cliente:', error);
        setError(error.response?.data || 'Erro ao excluir cliente.');
      });
    setShowDeleteModal(false);
    setClienteToDelete(null);
  };

  const confirmDelete = (cliente) => {
    setClienteToDelete(cliente);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setClienteToDelete(null);
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup>
        {clientes.map(cliente => (
          <ListGroup.Item key={cliente.id_cliente}>
            {cliente.nome}
            <Button
              variant="secondary"
              onClick={() => onSelectCliente(cliente)}
              style={{ marginLeft: '10px' }}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              onClick={() => confirmDelete(cliente)}
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
        <Modal.Body>Você tem certeza que deseja excluir o cliente?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancelar</Button>
          <Button variant="danger" onClick={() => handleDelete(clienteToDelete.id_cliente)}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClienteList;
