import React from 'react'
import logo from '../../../assets/images/navbar/logo.png';
import user from '../../../assets/images/navbar/user.svg';
import location from '../../../assets/images/navbar/location.svg';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from './authNavbar.module.css';
export default function AuthNavbar() {
  return (
    <Navbar expand="lg" className={`${style.navbar} `}>
      <Container>
        <Navbar.Brand className='d-flex align-items-center gap-3'>
          <Link to={'/auth/register'} className='d-flex align-items-center gap-1'>
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
          <Nav className={`${style.navs} ms-auto d-flex align-items-center`}>
            <Nav.Link as={Link} to={'/auth/login'} className={`${style.login} d-flex flex-column`}>
              <span className='d-lg-block d-none'>Sign in</span>
              <span className='d-lg-block d-none'>Account</span>
              <span className='d-lg-none d-block'>Sign in</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
