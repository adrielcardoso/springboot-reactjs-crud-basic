import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import api from '../../services/api';

const AgendaList = ({ onSelectAgenda, reload, onReloadAgendas, onResetForm }) => {
  const [agendas, setAgendas] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [agendaToDelete, setAgendaToDelete] = useState(null);

  useEffect(() => {
    api.get('/agendas')
      .then(response => setAgendas(response.data))
      .catch(error => console.error(error));
  }, [reload]);

  const handleDelete = (id) => {
    api.delete(`/agendas/${id}`)
      .then(response => {
        console.log('Agendamento excluído com sucesso');
        onReloadAgendas();
        onResetForm();
      })
      .catch(error => console.error('Erro ao excluir agendamento:', error));
    setShowDeleteModal(false);
    setAgendaToDelete(null);
  };

  const confirmDelete = (agenda) => {
    setAgendaToDelete(agenda);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setAgendaToDelete(null);
  };

  return (
    <>
      <ListGroup>
        {agendas.map(agenda => (
          <ListGroup.Item key={agenda.id_agenda}>
            {agenda.cliente.nome} - {agenda.servico.descricao} - {agenda.data_agendamento} - {agenda.horario}
            <Button
              variant="secondary"
              onClick={() => onSelectAgenda(agenda)}
              style={{ marginLeft: '10px' }}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              onClick={() => confirmDelete(agenda)}
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
        <Modal.Body>Você tem certeza que deseja excluir o agendamento?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(agendaToDelete.id_agenda)}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AgendaList;
