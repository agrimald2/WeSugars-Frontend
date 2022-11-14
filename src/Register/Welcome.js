import React from 'react';
import Button from 'react-bootstrap/Button';
import './Welcome.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div id='welcome'>
        <div className='logo__container'>
            <img className='main__logo' src={logo} alt="logo"/>
        </div>

        <Link to='/login'>
            <p>Ya tienes cuenta? <u>Ingresa!</u></p>
        </Link>

        <h1>¿Qué eres?</h1>
        <h1>¿Qué buscas?</h1>

        <div className='buttons__container mb-4'>
            <div className='button__ daddy'>
                <Link to='/register/first?opt=0'>
                    <Button>Soy <br/> Sugar DADDY/MOMMY <br/> que busca <br/> SUGAR BABY</Button>
                </Link>
            </div>
            <span>ELIGE UNA</span>
            <div className='button__ baby'>
                <Link to='/register/first?opt=1'>
                    <Button>Soy <br/> SUGAR BABY <br/> que busca <br/> Sugar DADDY/MOMMY</Button>
                </Link>
            </div>
        </div>
        <p className='px-2'>Al seleccionar una opción, confirmas que eres <b>mayor de 18 años</b> y que estás aceptando nuestros <i><u>términos y condiciones</u></i></p>
    </div>
  )
}   
