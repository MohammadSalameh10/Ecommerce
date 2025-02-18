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
import Products from './pages/user/products/Products';
import CategoryProducts from './pages/user/products/CategoryProducts';
import ProductDetails from './pages/user/products/ProductDetails';
import AuthProtectedRoute from './components/user/AuthProtectedRoute';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Contact from './pages/user/contact/Contact';
import Cart from './pages/user/cart/Cart';
import ProtectRoute from './components/user/ProtectRoute';
import CartContextProvider from './components/user/context/CartContext';
import ForgetPassword from './pages/user/forgetPassword/ForgetPassword';
import ChangePassword from './pages/user/changePassword/ChangePassword';
import Profile from './pages/user/profile/Profile';
import Info from './pages/user/profile/Info';
import Orders from './pages/user/profile/Orders';
import UserContextProvider from './components/user/context/UserContext';
import Photo from './pages/user/profile/Photo';
import Checkout from './pages/user/checkout/Checkout';



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
          },
          {
            path: 'forgetPassword',
            element: <ForgetPassword />
          },
          {
            path: 'changePassword',
            element: <ChangePassword />
          }
        ]
      },
      {
        path: '/',
        element:
          <UserContextProvider>
            <CartContextProvider>
              <ProtectRoute>
                <UserLayout />
              </ProtectRoute>
            </CartContextProvider>
          </UserContextProvider>,
        children: [
          {
            path: '/',
            element: <Home />
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
          },
          {
            path: 'contact',
            element: <Contact />
          },
          {
            path: 'cart',
            element: <Cart />
          },
          {
            path: 'profile',
            element: <Profile />,
            children: [
              {
                path: 'info',
                element: <Info />
              },
              {
                path: 'photo',
                element: <Photo />
              },
              {
                path: 'orders',
                element: <Orders />
              }
            ]
          },
          {
            path:'forgetPassword',
            element:<ForgetPassword/>
          },
          {
            path:'changePassword',
            element:<ChangePassword/>
          },
          {
            path:'checkout',
            element:<Checkout/>
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
