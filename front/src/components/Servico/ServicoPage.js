import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ServicoList from './ServicoList';
import ServicoForm from './ServicoForm';

const ServicoPage = () => {
  const [selectedServico, setSelectedServico] = useState(null);
  const [reload, setReload] = useState(false);

  const handleSelectServico = (servico) => {
    setSelectedServico(servico);
  };

  const handleClearSelectedServico = () => {
    setSelectedServico(null);
  };

  const handleReloadServicos = () => {
    setReload(!reload);
  };

  const resetForm = () => {
    setSelectedServico(null);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{selectedServico ? 'Editar Serviço' : 'Adicionar Serviço'}</Card.Title>
              <ServicoForm
                servicoId={selectedServico ? selectedServico.id_servico : null}
                onClearSelectedServico={handleClearSelectedServico}
                onReloadServicos={handleReloadServicos}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Lista de Serviços</Card.Title>
              <ServicoList
                onSelectServico={handleSelectServico}
                reload={reload}
                onReloadServicos={handleReloadServicos}
                onResetForm={resetForm}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServicoPage;
