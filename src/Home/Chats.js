import axios from 'axios';
import React, { useState } from 'react'
import { useEffectOnce } from '../Fidelia/useEffectOnce'
import HomeNavbar from './Components/HomeNavbar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserChat from './Components/UserChat';
import './Chats.css'
import { Link } from 'react-router-dom';
import getUserData from './Components/getUserData';

export default function Chats() {
  let [matches, setMatches] = useState([]);

  useEffectOnce(() => {
    axios.get('app/sugars/matches/get').then((response) => {
      setMatches(response.data);
    });

    axios.get('/app/userData/get').then((response) => {
      getUserData(response);
    });
  });

  return (
    <div id='chats'>
      <div className='mx-4 mt-3 header__container'>
        <h4>Al contactar a una baby obtendrás su número de teléfono pero desaparecerá de tu lista</h4>
      </div>
      <div className='container mb-5'>
        <Row xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} className='mt-4'>
          {
            matches.map((x) => (
              <Col key={x.match_id}>
                <div className='col__class'>
                  <UserChat match={x}/>
                </div>
              </Col>
            ))
          }
        </Row>
        <div className='pt-4'>
          <p><Link to='/purchase'>Consigue más babies!</Link></p>
        </div>
      </div>
      <div className='pb-5'>

      </div>
      <HomeNavbar active={3} type="Sugar"/>
    </div>
  )
}
