import React from 'react'
import { Button, Container, Form, FormLabel } from 'react-bootstrap'
import payment from '../../../assets/images/advantages/payment.svg'
import sales from '../../../assets/images/advantages/sales.svg'
import quality from '../../../assets/images/advantages/quality.svg'
import delivery from '../../../assets/images/advantages/delivery.svg'
import location from '../../../assets/images/navbar/location.svg';
import style from './contact.module.css'
export default function Contact() {
    return (
        <section className={style.contact}>
            <Container>
                <div className={`${style.contactTitle} text-center py-5`}>
                    <span className='fw-bold'>Contact With Us</span>
                    <h1 className='fw-bold'>You can ask us questions</h1>
                    <p>Contact us for all your questions and opinions, or you can solve your problems in a shorter time with our contact offices.</p>
                </div>

                <div className={`${style.contactInfo} d-flex gap-5 py-4 `}>
                    <div className='contact-info-item'>
                        <div className={`${style.contactDescription} py-3`}>
                            <h2 className='fw-bold'>Our Offices</h2>
                            <p>On dekande mydurtad mora även om skurkstat. Semirade timaheten rena. Radiogen pasam inte loba även om
                                prerade i garanterad traditionell specialitet till bebel. Ev is sönde. Tun gps-väst att epiligt. Diliga tresk dira. Ens
                                biov dijevis.</p>
                        </div>
                        <div className={`${style.contactInformation} d-flex justify-content-between`}>
                            <div className='contact-content d-flex flex-column justify-content-center'>
                                <div className='contact-content-item d-flex align-items-center gap-2 '>
                                    <img src={location} className='align-self-start' />
                                    <div className={`${style.contactText} contact-text d-flex flex-column pb-4`}>
                                        <span>United States</span>
                                        <h3>United States Office</h3>
                                        <p className={style.address}>205 Middle Road, 2nd Floor, New York</p>
                                        <h4>+02 1234 567 88</h4>
                                        <p>info@example.com</p>
                                    </div>
                                </div>

                            </div>
                            <div className='contact-content d-flex flex-column'>
                                <div className='contact-content-item d-flex align-items-center gap-2'>
                                    <img src={location} className='align-self-start' />
                                    <div className={`${style.contactText} d-flex flex-column`}>
                                        <span>Munich</span>
                                        <h3>Munich States Office</h3>
                                        <p className={style.address}>205 Middle Road, 2nd Floor, New York</p>
                                        <h4>+5 456 123 22</h4>
                                        <p className=''>contact@example.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${style.contactSocial} pt-5`}>
                            <div className='d-flex gap-2 align-items-center'>
                                <span>Follow us:</span>
                                <div className={`${style.socialIcon} d-flex gap-2`} >
                                    <a ><i className={`${style.facebook} fa-brands fa-facebook`}></i></a>
                                    <a ><i className={`${style.twitter} fa-brands fa-twitter`}></i></a>
                                    <a ><i className={`${style.instagram} fa-brands fa-instagram`}></i></a>
                                    <a><i className={`${style.linkedin} fa-brands fa-linkedin`}></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.contactForm} `}>
                        <p>On dekande mydurtad mora även om skurkstat. Semirade timaheten rena. Radiogen pasam
                            inte loba även om prerade i garanterad traditionell specialitet till bebel.</p>
                        <Form className={`${style.form} `}>
                            <div className={`${style.formName} d-flex gap-3`}>
                                <div>
                                    <Form.Group className="mb-1" controlId="username"  >
                                        <Form.Label htmlFor='username' className={style.formLabel}>Your name *</Form.Label>
                                        <Form.Control type="text" placeholder="" className={style.input} />
                                    </Form.Group>
                                </div>

                                <div>
                                    <Form.Group className="mb-1 " controlId="email" >
                                        <Form.Label htmlFor='email' className={style.formLabel}>Your email *</Form.Label>
                                        <Form.Control type="email" placeholder="" className={style.input} />
                                    </Form.Group>
                                </div>
                            </div>

                            <Form.Group className="mb-1" controlId="subject" >
                                <Form.Label htmlFor='subject' className={style.formLabel}>Subject *</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="message" >
                                <Form.Label htmlFor='message' className={style.formLabel}>Your message</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Button type='submit' className={style.sendButton}>Send Message</Button>
                        </Form>
                    </div>
                </div>

                <div className={`${style.advantages} d-flex flex-wrap pt-5`} >
                    <div className='advantage d-flex align-items-center gap-2 col-sm-6 col-xxl-3 mb-3'>
                        <img src={payment} className='align-self-start' />
                        <div className='advantage-description'>
                            <h3 className='fw-bold'>Payment only online</h3>
                            <p>Tasigförsamhet beteendedesign. Mobile
                                checkout. Ylig kärrtorpa.</p>
                        </div>
                    </div>

                    <div className='advantage d-flex align-items-center gap-2 col-sm-6 col-xxl-3 mb-3'>
                        <img src={sales} className='align-self-start' />
                        <div className='advantage-description'>
                            <h3 className='fw-bold'>New stocks and sales</h3>
                            <p>Tasigförsamhet beteendedesign. Mobile
                                checkout. Ylig kärrtorpa.</p>
                        </div>
                    </div>

                    <div className='advantage d-flex align-items-center gap-2 col-sm-6 col-xxl-3 mb-sm-0 mb-3'>
                        <img src={quality} className='align-self-start' />
                        <div className='advantage-description'>
                            <h3 className='fw-bold'>Quality assurance</h3>
                            <p>Tasigförsamhet beteendedesign. Mobile
                                checkout. Ylig kärrtorpa.</p>
                        </div>
                    </div>

                    <div className='advantage d-flex align-items-center gap-2 col-sm-6 col-xxl-3'>
                        <img src={delivery} className='align-self-start' />
                        <div className='advantage-description'>
                            <h3 className='fw-bold'>Delivery from 1 hour</h3>
                            <p>Tasigförsamhet beteendedesign. Mobile
                                checkout. Ylig kärrtorpa.</p>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}
