import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div id='notFound'>
        <div className='not__found'>
            <h1>404 Not Found</h1>
            <Link to='/'>
                <p>Volver al inicio</p>
            </Link>
        </div>
    </div>
  )
}
