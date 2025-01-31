import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import style from './login.module.css';
export default function Login() {

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const loginUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`, value);
      if (response.status === 200) {
        localStorage.setItem('userToken', response.data.token);
        navigate('/');
      }
    } catch (error) {
      setServerError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <section className={`${style.login}`}>
      <Container>
        <div className='d-flex flex-column gap-3'>
          <div className={`${style.authentication} d-flex justify-content-center align-items-center gap-4`}>
            <Link to={'/auth/login'}>Login</Link>
            <Link to={'/auth/register'}>Register</Link>
          </div>
          <p className='text-center'>If you have an account, sign in with your email address.</p>
        </div>
        <Form onSubmit={handleSubmit(loginUser)} className={`${style.form} m-auto d-flex flex-column `}>
          {serverError ? <div className='text-danger'>{serverError}</div> : null}

          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label className={`${style.label}`}>Email address *</Form.Label>
            <Form.Control type="email" placeholder="" {...register('email', { required: "email is required" })} />
            {errors.email ? <div className='text-danger'>{errors.email.message}</div> : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label className={`${style.label}`}>Password *</Form.Label>
            <Form.Control type="password" placeholder="" {...register('password', { required: "password is required" })} />
            {errors.password ? <div className='text-danger'>{errors.password.message}</div> : null}
          </Form.Group>
          <div className={`${style.check} d-flex justify-content-between align-items-center pb-3`}>
            <div className='d-flex gap-2 align-items-center'>
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div>
              <Link to={'/'}>Lost your password?</Link>
            </div>
          </div>
          <Button type='submit' className={`${style.button} w-100`} disabled={isLoading}>{isLoading ? "Loading..." : "Log in"}</Button>
        </Form>
      </Container>
    </section>
  )
}
