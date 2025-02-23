import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/navbar/logo.png';
import location from '../../../assets/images/navbar/location.svg';
import userProfile from '../../../assets/images/navbar/user.svg';
import wishlist from '../../../assets/images/navbar/wishlist.svg';
import cart from '../../../assets/images/navbar/cart.svg';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { NavDropdown } from 'react-bootstrap';
import style from './navbar.module.css';

export default function CustomNavbar() {

const { cartCount } = useContext(CartContext);
const {user ,setUser,isLoading} = useContext(UserContext);
const navigate = useNavigate();
const logOut = ()=>{
  localStorage.removeItem('userToken');
  setUser(null);
  navigate('/auth/login');
}


  return (
    <Navbar expand="lg" className={`${style.navbar}`}>
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
         
            <Nav.Link as={Link} to={'/contact'} >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${style.navs} ms-auto d-flex align-items-center`}>
            <Nav.Link as={Link} to={'/profile/info'} >
            <div className='d-flex  align-items-center'>
              <div className='d-flex'>
              <NavDropdown id="basic-nav-dropdown" className='d-lg-block d-none'>
              <NavDropdown.Item onClick={()=>logOut()} >Log Out</NavDropdown.Item>
            </NavDropdown>
            {user?user.image.secure_url? <img src={user.image.secure_url} className={`${style.profilePhoto} d-lg-block d-none`}/> : <img src={user.image} className={`${style.profilePhoto} d-lg-block d-none`} /> :""}
         
              </div>
              {user?<span className='pt-1 d-none d-lg-block'>{user.userName}</span>:''}
            </div>
            
              <span className='d-lg-none d-block'>Profile</span>
            </Nav.Link>
            <Nav.Link as={Link} to={'/'} className='position-relative'>
            <span className={`${style.wishCount}`}>0</span> 
              <img src={wishlist} className='d-lg-block d-none' />
              <span className='d-lg-none d-block'>Wishlist</span>
            </Nav.Link>
            <Nav.Link as={Link} to={'/cart'} className='position-relative'>
             <span className={`${style.cartCount} `}>{cartCount}</span> 
              <img src={cart} className='d-lg-block d-none' />
             
              <span className='d-lg-none d-block'>Cart</span>
            </Nav.Link>
            <Nav.Link  onClick={()=>logOut()} className='d-lg-none d-block'>
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
