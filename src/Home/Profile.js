import React, { useState } from 'react'
import './Profile.css';
import ProfileHeader from './Components/ProfileHeader';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Separator from './Components/Separator';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { useEffectOnce } from '../Fidelia/useEffectOnce';
import { Country, State } from "country-state-city";
import HomeNavbar from './Components/HomeNavbar';

export default function Profile() {
  let [userData, setUserData] = useState({});
  let [connectURL, setConnectURL] = useState("/profile");
  useEffectOnce(() => {
    let data;
    
    axios.get('/app/userData/get').then(function(response) {
      data = response.data[0].fields;

      data.country = data.country.slice(0, -2);
      data.country = data.country.slice(2);
      data.city = State.getStateByCodeAndCountry(data.city, data.country).name;
      data.country = Country.getCountryByCode(data.country).name;
      data.nationality = data.nationality.slice(0, -2);
      data.nationality = data.nationality.slice(2);
      data.nationality = Country.getCountryByCode(data.nationality).name;
      data.preferred_nationality = data.preferred_nationality.slice(0, -2);
      data.preferred_nationality = data.preferred_nationality.slice(2);
      data.preferred_nationality = Country.getCountryByCode(data.preferred_nationality).name;
      
      var r = document.querySelector(':root');
      if(data.body_type == null) 
      {
        data.type = "Sugar";
        data.for = "Baby";
        setConnectURL('/match');
        r.style.setProperty('--main-color', 'crimson');
      }
      else 
      {
        data.type = "Baby"
        data.for = "Sugar"
        setConnectURL('/baby/faq');
        r.style.setProperty('--main-color', 'darkmagenta');
      }

      switch(data.gender) 
      {
        case "M":
        case "FTM":
          data.myArticle = "un";
          break;
        case "F":
        case "MTF":
          data.myArticle = "una";
          break;
        case "O":
          data.myArticle = "une";
          break;
      }

      switch(data.preferred_gender)
      {
        case "M":
        case "FTM":
          data.otherArticle = "un";
          break;
        case "F":
        case "MTF":
          data.otherArticle = "una";
          break;
        case "O":
          data.otherArticle = "une";
          break;
      }

      setUserData(data);
    }).catch(function(err) {
      window.location.replace('/');
    });
  }, []);

  return (
    <div id='profile'>
      <div className='profile__top'>
        <ProfileHeader name={userData.name} who={userData.for}/>
          <div className='round__button button__'>
            <Link to={`${connectURL}`}>
                <Button>
                    CONECTA YA!
                </Button>
            </Link>
        </div>
      </div>

      <div className='profile__bottom mt-5 pt-3'>
        <Carousel variant='dark'>
          <Carousel.Item>
            <div className='mb-5'>
              <h3>SOY {userData.myArticle} {userData.type}...</h3>
              <div className='px-4'>
                <Separator/>
              </div>
              <h3>De {userData.nationality}</h3>
              <h3>De {userData.age} años</h3>
              <h3>{userData.money} USD</h3>
              {
                userData.type == "Baby" &&
                <h3>Contextura {userData.body_type}</h3>
              }
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='mb-5'>
              <h3>Que BUSCA {userData.otherArticle} {userData.for}...</h3>
              <div className='px-4'>
                <Separator/>
              </div>
              <h3>De {userData.preferred_nationality}</h3>
              <h3>De {userData.age_min} a {userData.age_max} años</h3>
              <h3>En {userData.city}, {userData.country}</h3>
              {
                userData.type == "Sugar" &&
                <h3>Contextura {userData.preferred_body_type}</h3>
              }
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <HomeNavbar active={0} type={userData.type}/>
    </div>
  )
}
