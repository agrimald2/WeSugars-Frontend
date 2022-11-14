import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function UserChat({match}) {
  return (
    <div id='userChat' className='px-2'>
        <div className='py-2'>
            <div className='fi'>
                <img src={`/media/${match.image}`}/>
            </div>
            <div className='fi'>
                <span>{match.name} ({match.age})</span>
            </div>
            <div className='fi'>
                <Link to={`/show/match?id=${match.match_id}`}>
                    <Button>Contactar!</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}
