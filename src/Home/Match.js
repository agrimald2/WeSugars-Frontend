import React, {useState} from 'react'
import { useEffectOnce } from '../Fidelia/useEffectOnce'
import ProfileHeader from './Components/ProfileHeader'
import axios from 'axios';
import getUserData from './Components/getUserData';
import Carousel from 'react-bootstrap/Carousel';
import './Match.css';
import HomeNavbar from './Components/HomeNavbar';
import Button from 'react-bootstrap/Button';
import checkicon from '../images/check.svg';
import { Link, useActionData } from 'react-router-dom';

export default function Match() {
    let [userData, setUserData] = useState({});
    let [matches, setMatches] = useState([]);
    let [count, setCount] = useState(0);
    let [error, setError] = useState("");
    let [babies, setBabies] = useState();
    let [availableBabies, setAvailableBabies] = useState({
        "use": false,
        "count": 0,
    });

    useEffectOnce(() => {
        let uda = 0;
        axios.get('/app/userData/get').then(function(response) {
            const data = getUserData(response);
            uda = data.babys_available;
            setUserData(data);
        });

        axios.get('/app/babies/get').then(function(response) {
            setMatches(response.data);

            const available = response.data.length;
            if(uda > available)
            {
                setAvailableBabies({
                    "use": true,
                    "count": available,
                });
            }
        });
    });

    const updateFieldChanged = index => e => {
        let newArr = [...matches];
        let amountToMatch = userData.babys_available;

        if(newArr[index].selected == true || count + 1 <= amountToMatch)
        {
            newArr[index].selected = !newArr[index].selected;
            if(newArr[index].selected == true) setCount(c => c + 1);
            else if(newArr[index].selected == false) setCount(c => c - 1);
            setMatches(newArr);
            setError("")
        }
        else
        {
            setError("No puedes seleccionar más babies!")
        }
    }

    const passImage = index => e => {
        let newArr = [...matches];
        if(newArr[index].images.length > newArr[index].currentImage + 1) newArr[index].currentImage++;
        else newArr[index].currentImage = 0;

        setMatches(newArr);
    }

    const confirmSelection = e => {
        e.preventDefault();
        let confirmed = [];
        matches.map((x) => {
            if(x.selected == true) confirmed.push(x.user_id);
        });

        axios.defaults.xsrfHeaderName = 'x-csrftoken'
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.withCredentials = true
        axios.post("/app/sugars/select/", confirmed).then(window.location.replace('/chats'));
    }

  return (
    <div id='match'>
        <ProfileHeader name={userData.name} who={userData.for}/>
        <div className='mt-2 mb-5 pb-3'>
            <span>{count} / </span>
            {
                availableBabies.use ? 
                <span> {availableBabies.count} (+{userData.babys_available - availableBabies.count}) </span>: 
                userData.babys_available
            } 
            {
                userData.babys_available <= 0 &&
                <div>
                    <span>Compra más paquetes <Link to='/purchase'>aquí!</Link></span>
                </div>
            }
            {
                count == (availableBabies.use ? availableBabies.count : userData.babys_available) &&
                <div>
                    {
                        count != 0 &&
                        <div className='pb-2'>
                        <Button onClick={confirmSelection}>
                            Confirmar Selección
                        </Button>
                    </div>
                    }
                </div>
            }
            {
                error != "" &&
                <div className='mb-1'>
                    <span className='color__main'>{error}</span>
                </div>
            }
            <Carousel variant='dark' indicators={false} interval={null} wrap={false}>
                {
                    matches.length == 0 &&
                    <div className='pt-5'>
                        <span>No hay babies disponibles, regresa más tarde!</span>
                    </div>
                }
                {matches.map((match, index) => (
                    <Carousel.Item key={index}>
                        <div className={`item__box ${match.selected ? "selected" : "deselected"}`}>
                            <img src={`/media/${match.images[match.currentImage]}`} onClick={passImage(index)}/>
                            <h4 className='mt-1'>{match.name} ({match.age})</h4>
                        </div>
                        <div className='button__box'>
                            <Button variant='success' onClick={updateFieldChanged(index)}>
                                <img src={checkicon}/>
                            </Button>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
        <HomeNavbar active={2} type={userData.type}/>
    </div>
  )
}
