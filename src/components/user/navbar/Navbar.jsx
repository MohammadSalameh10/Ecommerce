import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/navbar/logo.png';
import location from '../../../assets/images/navbar/location.svg';
import user from '../../../assets/images/navbar/user.svg';
import wishlist from '../../../assets/images/navbar/wishlist.svg';
import cart from '../../../assets/images/navbar/cart.svg';
import style from './navbar.module.css';
import { CartContext } from '../context/CartContext';
export default function CustomNavbar() {

const { cartCount } = useContext(CartContext);

  return (
    <Navbar expand="lg" className={`${style.navbar} `}>
      <Container>
        <Navbar.Brand className='d-flex align-items-center gap-3'>
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
          <Nav className={`${style.nav} ms-auto d-flex align-items-center gap-4`}>
            <Nav.Link as={Link} to={'/'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={'/products'} className={`${style.login} d-flex flex-column`}>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to={'/'} >
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to={'/contact'} >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${style.navs} ms-auto d-flex align-items-center`}>
            <Nav.Link as={Link} to={'/'}>
              <img src={user} className='d-lg-block d-none' />
              <span className='d-lg-none d-block'>My Profile</span>
            </Nav.Link>
            <Nav.Link as={Link} to={'/auth/login'} className={`${style.login} d-flex flex-column`}>
              <span className='d-lg-block d-none'>Sign in</span>
              <span className='d-lg-block d-none'>Account</span>
              <span className='d-lg-none d-block'>Sign in</span>
            </Nav.Link>
            <Nav.Link as={Link} to={'/'} >
              <img src={wishlist} className='d-lg-block d-none' />
              <span className='d-lg-none d-block'>Wishlist</span>
            </Nav.Link>
            <Nav.Link as={Link} to={'/cart'} className='position-relative'>
             <span className={style.cartCount}>{cartCount}</span> 
              <img src={cart} className='d-lg-block d-none' />
              <span className='d-lg-none d-block'>Cart</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
