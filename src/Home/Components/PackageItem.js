import React from 'react'
import axios from 'axios'

export default function PackageItem(props) {
  const onClick = e => {
    axios.post('/app/mercadopago/payment/create/' + props.price_id).then((response) => {
      window.location.replace(response.data);
    }).catch((err) => {
      window.location.reload();
    });
  };
  return (
    <div className='px-3 mb-2'>
        <li className='py-2'>
            <a className='purchase__box' onClick={onClick}>
                <span className='bg-black py-1 px-3'></span>
                <span className='fw-bold arial px-5'>Recibe {props.unlocks} Babies</span>
                <span className='arial fs-7 price p-1'>S/.{props.price}</span>
            </a>
        </li>
    </div>
  )
}
