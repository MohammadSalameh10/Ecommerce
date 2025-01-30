import React from 'react'
import CustomNavbar from './components/user/navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/user/login/Login';
import Register from './pages/user/register/Register';
import { ToastContainer } from 'react-toastify';
import UserLayout from './layouts/UserLayout';
import Home from './pages/user/home/Home';

export default function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'login',
            element: <Login />
          }
        ]
      },
      {
        path: '/',
        element: <UserLayout />,
        children: [
          {
            path: '/',
            element: <Home />
          }
        ]
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
      },
    ]
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}
