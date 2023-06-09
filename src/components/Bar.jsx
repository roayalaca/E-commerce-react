import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PurchasesSideBar from './PurchasesSideBar';

import React from 'react';

const Bar = () => {
    const [show, setShow] = useState(false)

    const navigate = useNavigate()

    const handleClose = () => {
        setShow(false)
    }

    const sideBarAction = () => {
        const token = localStorage.getItem("token")

        if(token){
            setShow(true)
        }else{
            navigate("/login")
        }
    }

    return (
        <>
        <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand as={ Link } to="/" >
                    E-commerce</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={ Link } to="/login" ><i class="bi bi-person"></i></Nav.Link>
                    <Nav.Link as={ Link } to="/purchases"  ><i class="bi bi-archive"></i></Nav.Link>
                    <Nav.Link 
                    onClick={ () => sideBarAction() }
                    ><i class="bi bi-cart3"></i></Nav.Link>
                </Nav>
                </Container>
        </Navbar>
        <PurchasesSideBar
        show={ show }
        handleClose={ handleClose }
        />

        </>
            
       
    );
};

export default Bar;