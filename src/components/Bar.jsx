import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import React from 'react';

const Bar = () => {
    return (
        <div>

            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand as={ Link } to="/">E-commerce App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={ Link } to="/login">Login</Nav.Link>
                    <Nav.Link as={ Link } to="/purchases">Purchases</Nav.Link>
                    <Nav.Link>Purchases (sidebar)</Nav.Link>
                </Nav>
                </Container>
        </Navbar>
            
        </div>
    );
};

export default Bar;