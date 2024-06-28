import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AgendaList from './AgendaList';
import AgendaForm from './AgendaForm';

const AgendaPage = () => {
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const [reload, setReload] = useState(false);

  const handleSelectAgenda = (agenda) => {
    setSelectedAgenda(agenda);
  };

  const handleClearSelectedAgenda = () => {
    setSelectedAgenda(null);
  };

  const handleReloadAgendas = () => {
    setReload(!reload);
  };

  const resetForm = () => {
    setSelectedAgenda(null);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{selectedAgenda ? 'Editar Agendamento' : 'Adicionar Agendamento'}</Card.Title>
              <AgendaForm
                agendaId={selectedAgenda ? selectedAgenda.id_agenda : null}
                onClearSelectedAgenda={handleClearSelectedAgenda}
                onReloadAgendas={handleReloadAgendas}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Lista de Agendamentos</Card.Title>
              <AgendaList
                onSelectAgenda={handleSelectAgenda}
                reload={reload}
                onReloadAgendas={handleReloadAgendas}
                onResetForm={resetForm}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AgendaPage;
