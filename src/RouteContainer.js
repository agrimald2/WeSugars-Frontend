import React from 'react'
import { 
    Routes,
    Route,
    useLocation,
} from 'react-router-dom'
import Cookies from 'js-cookie';
import NotFound from './NotFound';

import Welcome from './Register/Welcome';
import Register from './Register/Register';
import Blocks from './Register/Blocks';
import RegisterFinal from './Register/RegisterFinal';
import Login from './Register/Login';

import Profile from './Home/Profile';
import Purchase from './Home/Purchase';
import Match from './Home/Match';
import UploadPhotos from './Home/UploadPhotos';
import Chats from './Home/Chats';
import Settings from './Home/Settings';
import ShowMatch from './Home/ShowMatch';


export default function RouteContainer() {
    const location = useLocation();
    let authenticated = Cookies.get('trackingsessionid') ? true : false;
  return (
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome/>}>Welcome</Route>
        <Route path="/register/first" element={<Register/>}>Register</Route>
        <Route path="/register/block" element={<Blocks/>}>Register - Block</Route>
        <Route path="/register/final" element={<RegisterFinal/>}>Register - Final</Route>
        <Route path="/login" element={<Login/>}>Login</Route>
        {
            authenticated == true &&
            <>
                <Route path="/profile" element={<Profile/>}>Profile</Route>
                <Route path="/purchase" element={<Purchase/>}>Purchase</Route>
                <Route path="/match" element={<Match/>}>Purchase</Route>
                <Route path="/upload" element={<UploadPhotos/>}>Purchase</Route>
                <Route path="/chats" element={<Chats/>}>Purchase</Route>
                <Route path="/settings" element={<Settings/>}>Purchase</Route>
                <Route path="/show/match" element={<ShowMatch/>}>Purchase</Route>
            </>
        }
        <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}
