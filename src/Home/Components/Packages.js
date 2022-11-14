import React, { useState } from 'react'
import { useEffectOnce } from '../../Fidelia/useEffectOnce'
import PackageItem from './PackageItem'
import './Packages.css'
import axios from 'axios';

export default function Packages(props) {
    let [prices, setprices] = useState([]);
    useEffectOnce(() => {
        if(!props.settings.premium)
        {
            //Not premium
            axios.get('app/prices/get/0').then((response) => {
                setprices(response.data);
           });
        }
        else
        {
            axios.get('app/prices/get/1').then((response) => {
                setprices(response.data);
           });
        }
    });
  return (
    <div id="packages" className='px-4 pt-2 mb-4'>
        <div className={`py-3 bg-white rounded-3 shadow asdf' ${props.settings.premium ? "premium__package" : "border"}`}>
            <h5 className='arial fw-bold fs-6'>{props.settings.name}</h5>
            <p className='fs-7 arial grey'>{props.settings.desc}</p>
            {props.prices}
            <ul>
                {
                    prices.map((price) => (
                        <PackageItem key={price.price_id} price_id={price.price_id} unlocks={price.unlocks} price={price.price}/>
                    ))
                }
            </ul>

            <div className='px-3 arial fs-7 grey'>
                {
                    props.settings.premium == true ?
                    <b className='grey'>
                        {props.settings.rec}
                    </b>
                    :
                    <p className='px-3 arial fs-7 grey'>{props.settings.rec}</p>
                }                
            </div>
        </div>
    </div>
  )
}
