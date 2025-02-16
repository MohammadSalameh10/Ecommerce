import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router-dom';
import style from './profile.module.css';
export default function Profile() {
    return (
        <section className={style.profile}>
            <div className='d-flex gap-4'>
                <Sidebar className='d-none d-sm-block'>
                    <Menu>
                        <MenuItem component={<Link to="/profile/info" />}>
                            <i className="fa-solid fa-user" style={{ color: '#212529' }} ></i>
                            <span>Information</span>
                        </MenuItem>
                        <MenuItem component={<Link to="/profile/photo" />}>
                            <i className="fa-solid fa-image" style={{ color: '#212529' }} ></i>
                            <span>Photo</span>
                        </MenuItem>
                        <MenuItem component={<Link to="/profile/orders" />}>
                            <i className="fa-solid fa-truck" style={{ color: '#212529' }} ></i>
                            <span>Orders</span>
                        </MenuItem>
                    </Menu>
                </Sidebar>
                <Sidebar collapsed='true' className='d-block d-sm-none'>
                    <Menu>
                        <MenuItem component={<Link to="/profile/info" />}>
                            <i className="fa-solid fa-user" style={{ color: '#212529' }} ></i>
                        </MenuItem>
                        <MenuItem component={<Link to="/profile/photo" />}>
                            <i className="fa-solid fa-image" style={{ color: '#212529' }} ></i>
                        </MenuItem>
                        <MenuItem component={<Link to="/profile/orders" />}>
                            <i className="fa-solid fa-truck" style={{ color: '#212529' }} ></i>
                        </MenuItem>
                    </Menu>
                </Sidebar>
                <Outlet />
            </div>
        </section>
    )
}
