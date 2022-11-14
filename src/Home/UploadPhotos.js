import axios from 'axios';
import React, { useState } from 'react';
import { useEffectOnce } from '../Fidelia/useEffectOnce';
import getUserData from './Components/getUserData';
import ProfileHeader from './Components/ProfileHeader';
import Button from 'react-bootstrap/Button';
import getRandomToken from '../Fidelia/getRandomToken';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HomeNavbar from './Components/HomeNavbar';

export default function UploadPhotos() {
    let [userData, setUserData] = useState({});
    const [image, setImage] = useState([]);
    const [photos, setPhotos] = useState([]);

    const onChange = async(e) => {
        e.preventDefault();
        await setImage(e.target.files[0]);

        let data = new FormData();
        data.append("title", getRandomToken(20));
        data.append("image", e.target.files[0]);
        data.append("user_id", userData.user_id);
        console.log(userData.user_id);

        axios.defaults.xsrfHeaderName = 'x-csrftoken'
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.withCredentials = true
        axios({
            method: "POST",
            url: "/app/upload/photos/",
            data
        }).then(window.location.reload());
    }

    const removePhoto = index => e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = 'x-csrftoken'
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.withCredentials = true
        axios.delete('/app/photos/delete/' + index).then(window.location.reload());
    }

    useEffectOnce(() => {
        axios.get('/app/userData/get').then(function(response) {
            const data = getUserData(response);
            setUserData(data);
        });

        axios.get('/app/photos/get').then(function(response) {
            setPhotos([]);
            response.data.map((x) => {
                setPhotos(currentPhotos => currentPhotos.concat(x));
            });
        })
    })
  return (
    <div id='upload'>
        <ProfileHeader name={userData.name} who={userData.for}/>
        <div>
            <span>{photos.length} / 4 fotos</span>
        </div>
        <form method='POST' className='m-4'>
            {
                photos.length < 4 &&
                <div>
                    <label className='image_input_new_button' for='image_input_label'>Subir</label>
                    <input id='image_input_label'  type="file" name="image" placeholder='xd' onChange={onChange} className='mb-2'/>
                </div>
            }
        </form>
        <div className='mb-5 container'>
            <Row xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} className='px-5'>
            {
                photos.map((x) => (
                    <Col key={x.id}>
                        <div className='uploaded__photo'>
                            <img width={100} src={`/media/${x.image}`}/>
                            <Button variant='danger' onClick={removePhoto(x.id)}>
                                Remover
                            </Button>
                        </div>
                    </Col>
                ))
            }
            </Row>
        </div>
        <HomeNavbar type={userData.type}/>
    </div>
  )
}
