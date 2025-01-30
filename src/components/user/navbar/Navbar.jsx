import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import logo from '../../../assets/navbar/logo.png';
import location from '../../../assets/navbar/location.svg';
import user from '../../../assets/navbar/user.svg';
import wishlist from '../../../assets/navbar/wishlist.svg';
import cart from '../../../assets/navbar/cart.svg';
import style from './navbar.module.css';
export default function CustomNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand  className='d-flex align-items-center gap-3'>
           <Link to={'/'} className='d-flex align-items-center gap-1'> 
           <img src={logo} />
           <div className={`${style.websiteName} position-relative`}>
              <span>com</span>
              <span className='fw-bold'>JinStore</span>
            </div>
           </Link> 
          <img src={location} className='d-lg-flex d-none' />
          <div className={`${style.location} d-lg-flex flex-column d-none`}>
            <span>Deliver to</span>
            <span>all</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link as={Link} to={'/'}>
          <img src={user} />
          </Nav.Link>
            <Nav.Link as={Link} to={'/auth/login'} className={`${style.login} d-flex flex-column`}>
            <span>Sign in</span>
            <span>Account</span>
            </Nav.Link>
            <Nav.Link as={Link} to={'/'} >
          <img src={wishlist} />
            </Nav.Link>
            <Nav.Link as={Link} to={'/'} >
          <img src={cart} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
