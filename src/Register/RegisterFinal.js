import React, { useState } from 'react';
import logo from '../images/logo.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import getURLParams from '../Fidelia/getURLParams';
import axios from 'axios';

export default function RegisterFinal() {
    const params = getURLParams();
    var root = document.querySelector(':root');
    if(params.opt == 0) root.style.setProperty('--main-color', 'crimson');
    else root.style.setProperty('--main-color', 'darkmagenta');
    const [form, setForm] = useState({});
    const setField = (field, value) => {
        setForm({
        ...form, 
        [field]:value
        });
    };

    const onSuccess = (r, values) => {
        window.location.replace('/profile')
    }

    const onSubmit = e => {
        e.preventDefault();
        form.token = params.token;
        axios.defaults.xsrfHeaderName = 'x-csrftoken'
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.withCredentials = true
        axios.post('/app/register/user/', form).then((s) => onSuccess(s));
    }
  return (
    <div id='registerFinal'>
        <div>
            <img className='logo__small' src={logo}/>
        </div>
        <div>
            <h1>REGÍSTRATE Y CONECTA</h1>
            <div className="separator__container">
                <div className="separator__"></div>
            </div>
            <div className='mt-2'>
                <div className='options__container'>
                    <img className='img__ball' src='https://img.freepik.com/free-photo/beautiful-girl-stands-near-walll-with-leaves_8353-5377.jpg?w=2000'/>
                    <img className='img__ball' src='https://i.pinimg.com/736x/28/42/c9/2842c9d941fc16ca9e0f34d148c1c33c.jpg'/>
                    <img className='img__ball' src='https://media.istockphoto.com/id/846730696/photo/portrait-teenager.jpg?b=1&s=170667a&w=0&k=20&c=PNz3dsppr_Q0s_dNI_LaZdoY0oQtH812tvwZ13n-ods='/>
                    <div className='options__'>
                        <h4 className=''><b>+256 {params.opt == 0 ? 'BABYS' : 'SUGARS'}</b></h4>
                        <p className='color__main mb-0'>Ya coincidieron contigo</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <form onSubmit={onSubmit}>
                <div className='form__container__normal px-3'>
                    <Form.Group className='pb-1'>
                        <Form.Control placeholder='Correo' onChange={(e) => setField("email", e.target.value)} value={form.email}/>
                    </Form.Group>
                    <Form.Group className='py-1'>
                        <Form.Control type='password' placeholder='Contraseña' onChange={(e) => setField("password", e.target.value)} value={form.password}/>
                    </Form.Group>
                </div>
                <p className='font__small px-5 pt-2'>
                    No enviamos ningún correo, ni diario, ni semanal, ni mensual, ni anual. Sólo es para confirmar tu registro y contraseña.
                </p>

                <div className='form__container__normal px-5 py-3'>
                    <span className='color__main'>NÚMERO DE CELULAR</span>
                    <Form.Group>
                        <Form.Control placeholder='+51 987654321' onChange={(e) => setField("phone", e.target.value)} value={form.phone}/>
                    </Form.Group>
                </div>
                
                <p className='font__small align__justify px-3 lh-sm py-2'>
                    Tus datos<b> nunca serán mostrados </b>ni compartidos con nadie, ni siquiera con tus potenciales babies; sólo tú podrás acceder a los números de celular de tus potenciales babies, nunca al revés. Entonces, sólo pedimos tu celular por dos motivos: 1. Validación de usuarios (no fakes). 2. Bloquear tu contacto para todos los números anteriormente registrados.   
                </p>
                <div className="round__button button__ button__large">
                    <Button type='submit'>
                        CONECTA YA!
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}
