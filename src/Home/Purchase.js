import React, {useState} from 'react'
import { useEffectOnce } from '../Fidelia/useEffectOnce';
import getUserData from './Components/getUserData';
import ProfileHeader from './Components/ProfileHeader'
import axios from 'axios';
import Packages from './Components/Packages';
import HomeNavbar from './Components/HomeNavbar';

export default function Purchase() {
    let [userData, setUserData] = useState({});
    let [packageNormal, setNormalPackage] = useState({
        name: "PAQUETE REGULAR",
        desc: "Selección aleatoria automática de babies",
        rec: "Todos los contactos que recibirás, han sido previamente verificados",
        premium: false
    });
    let [packagePremium, setPremiumPackage] = useState({
        name: "PAQUETE PREMIUM",
        desc: "Te permite escoger entre perfiles con foto",
        rec: "Te recomendamos esta opción para que tengas la posibilidad de elegir las que más te gusten!",
        premium: true
    });

    useEffectOnce(() => {
        axios.get('/app/userData/get').then(function(response) {
            const data = getUserData(response);
            setUserData(data);
        });
    });

  return (
    <div id="purchase">
        <div className='profile__top'>
            <ProfileHeader name={userData.name} who={userData.for}/>
        </div>
        <div className='packages mt-3 mb-4 packages__bg'>
            <div className='py-3'>
                <span className='arial'>Tenemos estos paquetes para ti</span>
                <Packages settings={packageNormal}/>
                <Packages settings={packagePremium} className='premium__package'/>
            </div>
        </div>
        <HomeNavbar active={1} type={userData.type}/>
    </div>
  )
}
