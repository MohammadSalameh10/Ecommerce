import React from 'react'
import { UserContext } from '../../../components/user/context/UserContext';
import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Loading from '../../../components/user/loading/Loading';
import { Link } from 'react-router-dom';
import style from './info.module.css';
export default function Info() {
  const { user,setUser,isLoading } = useContext(UserContext);
  const logOut = () => {
    localStorage.removeItem('userToken');
    setUser(null);
    navigate('/auth/login');
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <section className={style.info}>
      <h1 className='fs-4 fw-bold'>Account Information</h1>
      <p><span className='fw-bold'>ID:</span> {user._id}</p>
      <Form className='pb-2'>
        <div className='d-flex gap-4 flex-wrap '>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
          >
            <Form.Control type="text" value={user.userName} disabled className={style.label} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingEmail" label="Email" >
            <Form.Control type="email" value={user.email} disabled className={style.label} />
          </FloatingLabel>
        </div>

      </Form>
      <div className='pt-4'>
        <h2 className='fs-5 fw-bold'>Change Your Password</h2>
        <p className='pb-2'>For your security, we highly recommend that you choose a unique password that you don't use for any other online account.</p>
        <Link to={'/forgetPassword'} className={`${style.button} `}>Change Password</Link>
      </div>
      <div className='pt-5'>
        <h2 className='fs-5 fw-bold pb-2'>Log Out</h2>
        <button onClick={()=>logOut()}>Log Out</button>
      </div>
    </section>
  )
}
