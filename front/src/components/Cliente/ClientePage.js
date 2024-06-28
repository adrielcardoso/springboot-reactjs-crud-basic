import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ClienteList from './ClienteList';
import ClienteForm from './ClienteForm';

const ClientePage = () => {
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [reload, setReload] = useState(false);

  const handleSelectCliente = (cliente) => {
    setSelectedCliente(cliente);
  };

  const handleClearSelectedCliente = () => {
    setSelectedCliente(null);
  };

  const handleReloadClientes = () => {
    setReload(!reload);
  };

  const resetForm = () => {
    setSelectedCliente(null);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{selectedCliente ? 'Editar Cliente' : 'Adicionar Cliente'}</Card.Title>
              <ClienteForm
                clienteId={selectedCliente ? selectedCliente.id_cliente : null}
                onClearSelectedCliente={handleClearSelectedCliente}
                onReloadClientes={handleReloadClientes}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Lista de Clientes</Card.Title>
              <ClienteList
                onSelectCliente={handleSelectCliente}
                reload={reload}
                onReloadClientes={handleReloadClientes}
                onResetForm={resetForm}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientePage;
