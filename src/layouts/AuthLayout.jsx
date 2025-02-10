import React from 'react'
import CustomNavbar from '../components/user/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/user/footer/Footer'
import AuthNavbar from '../components/user/authNavbar/AuthNavbar'

export default function AuthLayout() {
    return (
        <>
            <AuthNavbar />
            <Outlet />
            <Footer />
        </>
    )
}
