import axios from 'axios';
import React, { useState } from 'react'
import getURLParams from '../Fidelia/getURLParams'
import { useEffectOnce } from '../Fidelia/useEffectOnce';
import HomeNavbar from './Components/HomeNavbar';

export default function ShowMatch() {
    let [match, setMatch] = useState({});
    useEffectOnce(() => {
        const params = getURLParams();

        axios.get("/app/sugars/matches/show/" + params.id).then((response) => {
            setMatch(response.data);
        });
    });
  return (
    <div id='showMatch'>
        <div className='match__container'>
            <div className='m-5'>
                <div id='pp'>
                    <img src={`/media/${match.image}`}/>
                </div>
                <div className='pt-2'>
                    <h2>{match.name} ({match.age})</h2>
                </div>
                <div className='phone__container mx-3'>
                    <b>Contacto:</b><br/>
                    <h1>{match.phone}</h1>
                </div>
            </div>
            <div className='mx-3 header__container mt-3'>
                <h3>Recuerda guardar el número AHORA ya que no podras volver a acceder a esta página</h3>
            </div>
        </div>
        <HomeNavbar type={"Sugar"}/>
    </div>
  )
}
