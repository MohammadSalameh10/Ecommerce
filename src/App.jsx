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
import NotFound from './pages/user/notFound/NotFound';
import Categories from './pages/user/category/Categories';
import Products from './pages/user/products/Products';
import CategoryProducts from './pages/user/products/CategoryProducts';
import ProductDetails from './pages/user/products/ProductDetails';
import AuthProtectedRoute from './components/user/AuthProtectedRoute';


export default function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/auth',
        element:
          <AuthProtectedRoute>
            <AuthLayout />
          </AuthProtectedRoute>,
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
          },
          {
            path: 'categories',
            element: <Categories />
          },
          {
            path: 'categories/:categoryId',
            element: <CategoryProducts />
          },
          {
            path: 'products',
            element: <Products />
          },
          {
            path: 'products/:productId',
            element: <ProductDetails />
          }
        ]
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
      },
      {
        path: '*',
        element: <NotFound />
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
