import React, { useState } from 'react'
import getURLParams from '../../Fidelia/getURLParams';
import logo from '../../images/logo.png'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useEffectOnce } from '../../Fidelia/useEffectOnce';

export default function ProfileHeader(props) {
    const params = getURLParams();
    let [profilePhoto, setProfilePhoto] = useState({
        "image": ""
    });
    let [count, setCount] = useState(0);

    const logout = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = 'x-csrftoken'
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.withCredentials = true
        axios.post('https://ws-backend.herokuapp.com/app/logout/').then(window.location.replace("/"));
    }

    useEffectOnce(() => {
        axios.get('/app/photos/main').then(function(response) {
            setProfilePhoto(response.data);
        });
        axios.get('/app/babies/count').then(function(response) {
            setCount(response.data);
        });
    });
  return (
    <div id='profileHeader'>
        <div>
            <a href='https://google.com'>
                <img className='logo__small mb-1' src={logo}/>
            </a>
            <p className='px-4 fs-7'>Recuerda que presionar el logo te manda a google!</p>
        </div>
        <div className='container'>
            <div className='separator__container'>
                <div className="separator__"></div>
            </div>

            <div>
                <img className="profile__photo" src={`/media/${profilePhoto.image}`}/>
            </div>
            <div className='edit__button'>
                <Link to='/upload'>
                    <Button>
                        Editar
                    </Button>
                </Link>
            </div>
            <div className='mt-3 row'>
                <div className='col'/>
                
                <div className='col'/>
                <span className='fs-2 col'>{props.name}</span>
                <div className='round__button button__black col'>
                    <Button onClick={logout}>
                        Salir
                    </Button>
                </div>
                <div className='col'/>
            </div>
        </div>


        <div className='mt-2'>
                <div className='options__container'>
                    <img className='img__ball' src='https://img.freepik.com/free-photo/beautiful-girl-stands-near-walll-with-leaves_8353-5377.jpg?w=2000'/>
                    <img className='img__ball' src='https://i.pinimg.com/736x/28/42/c9/2842c9d941fc16ca9e0f34d148c1c33c.jpg'/>
                    <img className='img__ball' src='https://media.istockphoto.com/id/846730696/photo/portrait-teenager.jpg?b=1&s=170667a&w=0&k=20&c=PNz3dsppr_Q0s_dNI_LaZdoY0oQtH812tvwZ13n-ods='/>
                    <div className='options__'>
                        <h4 className=''>+{count} {props.who}s</h4>
                    </div>
                </div>
                <h4 className='color__main'>Están esperando por ti</h4>
            </div>
    </div>
  )
}
