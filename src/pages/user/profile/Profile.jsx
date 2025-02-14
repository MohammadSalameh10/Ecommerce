import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router-dom';
import style from './profile.module.css';
export default function Profile() {
    return (
        <section className={style.profile}>
            <div className='d-flex gap-4'>
            <Sidebar>
                <Menu>
                    <MenuItem component={<Link to="/profile/info" />} > Info</MenuItem>
                    <MenuItem component={<Link to="/profile/orders" />}> Orders</MenuItem>
                </Menu>
            </Sidebar>
            <Outlet />
            </div>
        </section>
    )
}
