import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ClientePage from './components/Cliente/ClientePage';
import ServicoPage from './components/Servico/ServicoPage';
import AgendaPage from './components/Agenda/AgendaPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">HOW Univali Application</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/clientes">Clientes</Nav.Link>
            <Nav.Link as={Link} to="/servicos">Serviços</Nav.Link>
            <Nav.Link as={Link} to="/agendas">Agendas</Nav.Link>
          </Nav>
        </Navbar>
        <Container>
          <Routes>
            <Route path="/clientes" element={<ClientePage />} />
            <Route path="/servicos" element={<ServicoPage />} />
            <Route path="/agendas" element={<AgendaPage />} />
            <Route path="/" element={<h2>Bem-vindo à Aplicação HOW Univali</h2>} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
