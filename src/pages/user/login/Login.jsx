import React, { useState } from 'react'
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
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/signin`, value);
      if (response.status === 200) {
        localStorage.setItem('userToken', response.data.token);
        navigate('/');
      }
    } catch (error) {
      if (error.response.status === 400) {
        setServerError(error.response.data.message);
      } else {
        setServerError("server error");
      }
  
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
         
          <Form.Group className="mb-1" controlId="email">
            <Form.Label className={`${style.label}`} htmlFor='email'>Email address *</Form.Label>
            <Form.Control type="email" placeholder="" {...register('email', { required: "Please enter your email" })} />
            {errors.email ? <div className='text-danger error'>{errors.email.message}</div> : null}
          </Form.Group>

          <Form.Group className="mb-2" controlId="password">
            <Form.Label className={`${style.label}`} htmlFor='password'>Password *</Form.Label>
            <Form.Control type="password" placeholder="" {...register('password', { required: "Please enter your password" })} />
            {errors.password ? <div className='text-danger error'>{errors.password.message}</div> : null}
          </Form.Group>
          <div className={`${style.check}  pb-3`}>
              <Link to={'/auth/forgetPassword'}>Lost your password?</Link>
          </div>
          <Button type='submit' className={`${style.button} w-100`} disabled={isLoading}>{isLoading ? "Loading..." : "Log in"}</Button>
          {serverError ? <div className='text-danger text-center error'>{serverError}</div> : null}
        </Form>
      </Container>
    </section>
  )
}
