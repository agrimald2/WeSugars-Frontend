import React, {useState} from 'react'
import logo from '../images/logo.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function Login() {
    var root = document.querySelector(':root');
    root.style.setProperty('--main-color', 'crimson');
    const [form, setForm] = useState({});
    const setField = (field, value) => {
        setForm({
        ...form, 
        [field]:value
        });
    };

    let [error, setError] = useState("");

    const onSuccess = (r, values) => {
        window.location.replace('/profile');
    }

    const onSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = 'x-csrftoken'
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.withCredentials = true
        axios.post('/app/login/', form).then((s) => onSuccess(s)).catch((err) => {
            setError("Combinacion de Usuario y Contraseña no coinciden o el usuario no existe");
        });
    }
  return (
    <div id="login">
        <div className='logo__container'>
            <img className='main__logo' src={logo}/>
        </div>
        <div>
            <h1>INGRESA Y CONECTA</h1>
            <div className="separator__container">
                <div className="separator__"></div>
            </div>
        </div>
        <div className='mt-5'>
            <form onSubmit={onSubmit}>
                <div className='form__container__normal px-3'>
                    <Form.Group className='pb-1'>
                        <Form.Control placeholder='Correo' onChange={(e) => setField("email", e.target.value)} value={form.email}/>
                    </Form.Group>
                    <Form.Group className='py-1'>
                        <Form.Control type='password' placeholder='Contraseña' onChange={(e) => setField("password", e.target.value)} value={form.password}/>
                    </Form.Group>
                </div>
                {
                    error != "" &&
                    <div className='px-3 pt-2 error__text'>
                        <span>{error}</span>
                    </div>
                }
                <div className="round__button button__ button__large mt-3">
                    <Button type='submit'>
                        INGRESA!
                    </Button>
                </div>
                <p className='font__small align__justify px-3 lh-sm py-2 mt-3'>
                    Tus datos<b> nunca serán mostrados </b>ni compartidos con nadie, ni siquiera con tus potenciales babies; sólo tú podrás acceder a los números de celular de tus potenciales babies, nunca al revés. Entonces, sólo pedimos tu celular por dos motivos: 1. Validación de usuarios (no fakes). 2. Bloquear tu contacto para todos los números anteriormente registrados.   
                </p>
            </form>
        </div>
    </div>
  )
}
