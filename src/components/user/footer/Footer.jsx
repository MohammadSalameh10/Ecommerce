import React from 'react'
import phone from '../../../assets/content/phone.svg'
import email from '../../../assets/content/email.svg'
import emails from '../../../assets/content/emails.svg'
import facebook from '../../../assets/social/facebook.svg'
import x from '../../../assets/social/x.svg'
import instagram from '../../../assets/social/instagram.svg'
import linkedin from '../../../assets/social/linkedin.svg'
import googleplay from '../../../assets/app/googleplay.png'
import appstore from '../../../assets/app/appstore.png'
import visa from '../../../assets/payment/visa.svg'
import mastercard from '../../../assets/payment/mastercard.svg'
import paypal from '../../../assets/payment/paypal.svg'
import skrill from '../../../assets/payment/skrill.svg'
import klarna from '../../../assets/payment/klarna.svg'
import { Placeholder } from 'react-bootstrap'
import style from './footer.module.css'
export default function Footer() {
    return (
        <footer className={`${style.footer} p-5`}>
            <div className="container d-flex flex-column gap-5">
                <div className={`${style.footerTop} d-flex justify-content-between`}>
                    <div className='footer-item'>
                        <h2 className='fs-5'>Join our newsletter for £10 offs</h2>
                        <p>Register now to get latest updates on promotions &
                            coupons.Don’t worry, we not spam!</p>
                    </div>
                    <div className='footer-item'>
                        <form className='d-flex flex-column gap-1'>
                            <div className='d-flex position-relative '>
                                <img src={emails} className={`${style.sendImage}`} />
                                <input className={`${style.sendInput}`} type="email" placeholder='Enter your email address' />
                                <button className={`${style.sendButton} p-2`} >SEND</button>
                            </div>
                            <p>By subscribing you agree to our<span className={`${style.purple}`}>Terms & Conditions and Privacy & Cookies Policy.</span></p>
                        </form>
                    </div>
                </div>
                <div className={`${style.footerMiddle} row`}>
                    <div className='footer-links d-flex flex-column col-sm-6 col-md-4 col-xxl-2 gap-3 '>
                        <h2 className='fs-6'>Do You Need Help ?</h2>
                        <nav className='d-flex flex-column gap-3'>
                            <a href="">Autoseligen syr. Nek diarask fröbomba. Nör
                                antipol kynoda nynat. Pressa fåmoska.</a>
                            <div className='footer-phone d-flex align-items-center gap-3'>
                                <div>
                                    <img src={phone} />
                                </div>
                                <div className='phone-information d-flex flex-column'>
                                    <p>Monday-Friday: 08am-9pm</p>
                                    <span className='fw-bold fs-5'>0 800 300-353</span>
                                </div>
                            </div>
                            <div className='footer-email d-flex align-items-center gap-3'>
                                <img src={email} />
                                <div className='email-information d-flex flex-column'>
                                    <p>Need help with your order?</p>
                                    <span className='fw-bold'>info@example.com</span>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className='footer-links d-flex flex-column col-sm-6 col-md-4 col-xxl-2 gap-3 pt-sm-0 pt-3'>
                        <h2 className='fs-6'>Make Money with Us</h2>
                        <nav className='d-flex flex-column gap-1'>
                            <a href="">Sell on Grogin</a>
                            <a href="">Sell Your Services on Grogin</a>
                            <a href="">Sell on Grogin Business</a>
                            <a href="">Sell Your Apps on Grogin</a>
                            <a href="">Become an Affilate</a>
                            <a href="">Advertise Your Products</a>
                            <a href="">Sell-Publish with Us</a>
                            <a href="">Become an Blowwe Vendor</a>
                        </nav>
                    </div>
                    <div className='footer-links d-flex flex-column col-sm-6 col-md-4 col-xxl-2 gap-3 pt-md-0 pt-3'>
                        <h2 className='fs-6'>Let Us Help You</h2>
                        <nav className='d-flex flex-column gap-1'>
                            <a href="">Accessibility Statement</a>
                            <a href="">Your Orders</a>
                            <a href="">Returns & Replacements</a>
                            <a href="">Shipping Rates & Policies</a>
                            <a href="">Refund and Returns Policy</a>
                            <a href="">Privacy Policy</a>
                            <a href="">Terms and Conditions</a>
                            <a href="">Cookie Settings</a>
                            <a href="">Help Center</a>
                        </nav>
                    </div>
                    <div className='footer-links d-flex flex-column col-sm-6  col-md-4 col-xxl-2 gap-3 pt-3 pt-xxl-0'>
                        <h2 className='fs-6'>Get to Know Us</h2>
                        <nav className='d-flex flex-column gap-1'>
                            <a href="">Careers for Grogin</a>
                            <a href="">About Grogin</a>
                            <a href="">Inverstor Relations</a>
                            <a href="">Grogin Devices</a>
                            <a href="">Customer reviews</a>
                            <a href="">Social Responsibility</a>
                            <a href="">Store Locations</a>
                        </nav>
                    </div>
                    <div className='footer-links d-flex flex-column col-md-6 col-xxl-4 gap-3 pt-3 pt-xxl-0'>
                        <h2 className='fs-6'>Download our app</h2>
                        <div className='footer-content d-flex flex-column gap-4'>
                            <div className='footer-download d-flex flex-column gap-2'>
                                <div className='footer-app d-flex gap-3 align-items-center'>
                                    <img src={googleplay} />
                                    <div className='d-flex flex-column'>
                                        <p>Download App Get</p>
                                        <p> -10% Discount</p>
                                    </div>
                                </div>
                                <div className='footer-app d-flex gap-3 align-items-center'>
                                    <img src={appstore} />
                                    <div className='d-flex flex-column'>
                                        <p>Download App Get</p>
                                        <p> -20% Discount</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`${style.footerSocial} d-flex flex-column gap-1`} >
                                <p>Follow us on social media:</p>
                                <div className='social-icons d-flex gap-2'>
                                    <img src={facebook} />
                                    <img src={x} />
                                    <img src={instagram} />
                                    <img src={linkedin} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${style.footerBottom} d-flex justify-content-between align-items-center`}>
                    <div className='footer-bottom-left d-flex flex-column gap-2'>
                        <p>Copyright 2024 © Jinstore WooCommerce WordPress Theme. All right reserved. Powered by <span className={`${style.purple}`}>BlackRise Themes.</span></p>
                        <div className='footer-payment d-flex gap-2'>
                            <img src={visa} />
                            <img src={mastercard} />
                            <img src={paypal} />
                            <img src={skrill} />
                            <img src={klarna} />
                        </div>
                    </div>
                    <div className={`${style.footerBottomRight}`} >
                        <nav className='d-flex gap-2'>
                            <a href="">Terms and Conditions</a>
                            <a href="">Privacy Policy</a>
                            <a href="">Order Tracking</a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}
