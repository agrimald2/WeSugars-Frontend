import React, {useState} from 'react';
import './HomeNavbar.css';
import homeicon from '../../images/home.svg';
import ticketicon from '../../images/ticket.svg';
import personicon from '../../images/person.svg';
import settingsicon from '../../images/settings.svg';
import chatsicon from '../../images/chats.svg';
import questionicon from '../../images/question.svg';
import { Link } from 'react-router-dom';

export default function HomeNavbar({active, type}) {
    let [isBaby, setIsBaby] = useState(true);
  return (
    <div id='homeNavbar'>
        <nav className='navbar__profile'>
            <div className='inner__nav'>
                <Link to='/profile'>
                    <div className={active == 0 && 'active__nav'}>
                        <img src={homeicon}/>
                    </div>
                </Link>
                {
                    type == "Baby" ?
                    <>
                        <Link to='/baby/faq'>
                            <div className={active == 5 && 'active__nav'}>
                                <img src={questionicon}/>
                            </div>
                        </Link>
                    </>
                    :
                    <>
                        <Link to='/purchase'>
                            <div className={active == 1 && 'active__nav'}>
                                <img src={ticketicon}/>
                            </div>
                        </Link>
                        <Link to='/match'>
                            <div className={active == 2 && 'active__nav'}>
                                <img src={personicon}/>
                            </div>
                        </Link>
                        <Link to='/chats'>
                            <div className={active == 3 && 'active__nav'}>
                                <img src={chatsicon}/>
                            </div>
                        </Link>
                    </>
                }
                <Link to='/settings'>
                    <div className={active == 4 && 'active__nav'}>
                        <img src={settingsicon}/>
                    </div>
                </Link>
            </div>
        </nav>
    </div>
  )
}
