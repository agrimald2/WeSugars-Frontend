import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import getURLParams from '../Fidelia/getURLParams';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Blocks() {
    const params = getURLParams();
    var root = document.querySelector(':root');
    if(params.opt == 0) root.style.setProperty('--main-color', 'crimson');
    else root.style.setProperty('--main-color', 'darkmagenta');

    const nextLink = '/register/final?opt=' + params.opt + '&token=' + params.token;

    const [form, setForm] = useState({});
    const setField = (field, value) => {
        setForm({
        ...form, 
        [field]:value
        });
    }

    const onSuccessPhone = (r, values) => {
        setField("phone", "");
    }

    const onSuccessEmail = (r, values) => {
        setField("email", "");
    }

    const submitPhone = e => {
        e.preventDefault();
        form.token = params.token;
        axios.defaults.xsrfHeaderName = 'x-csrftoken'
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.withCredentials = true
        axios.post('https://ws-backend.herokuapp.com/app/register/block/phone/', form).then((s) => onSuccessPhone(s));
    }

    const submitEmail = e => {
        e.preventDefault();
        form.token = params.token;
        axios.defaults.xsrfHeaderName = 'x-csrftoken'
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.withCredentials = true
        axios.post('https://ws-backend.herokuapp.com/app/register/block/email/', form).then((s) => onSuccessEmail(s));
    }
  return (
    <div id='blocks'>
        <div className=''>
            <img className='logo__small' src={logo}/>
        </div>
        <div>
            <h1>TU PRIVACIDAD</h1>
            <span>Bloquearemos los números y correos que desees</span>
            <div className='separator__container'>
                <div className='separator__'></div>
            </div>
        </div>
        <div>
            <span className='color__main'>NÚMEROS DE CELULAR</span>
            <form onSubmit={submitPhone}>
                <div className='round__button white__button form__container px-3 m-3 py-3'>
                    <Form.Group>
                        <Form.Control type='text' placeholder='+51 987654321' onChange={(e) => setField("phone", e.target.value)} value={form.phone}/>
                    </Form.Group>
                    <Button className='mt-2' type='submit'>
                        AGREGAR +
                    </Button>
                </div>
            </form>
        </div>
        <div className='mt-4'>
            <span className='color__main'>CORREOS ELECTRONICOS</span>
            <form onSubmit={submitEmail}>
                <div className='round__button white__button form__container px-3 m-3 py-3'>
                    <Form.Group>
                        <Form.Control type='text' placeholder='email@test.com' onChange={(e) => setField("email", e.target.value)} value={form.email}/>
                    </Form.Group>
                    <Button className='mt-2' type='submit'>
                        AGREGAR +
                    </Button>
                </div>
            </form>
        </div>

        <div className='round__button button__ button__large'>
            <Link to={nextLink}>
                <Button>
                    SIGUIENTE
                </Button>
            </Link>
        </div>
    </div>
  )
}
