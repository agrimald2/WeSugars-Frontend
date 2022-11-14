import React, { useState } from 'react';
import './Register.css';
import Form from 'react-bootstrap/Form';
import { useEffectOnce } from '../Fidelia/useEffectOnce';
import { Country, State } from "country-state-city";
import BootstrapSelect from 'react-bootstrap-select-dropdown';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ReactSlider from 'react-slider';
import getURLParams from '../Fidelia/getURLParams';
import getRandomToken from '../Fidelia/getRandomToken';

export default function Register() {
    const params = getURLParams();
    var r = document.querySelector(':root');

    if (params.opt == 0) {
        r.style.setProperty('--main-color', 'crimson');
    }
    else {
        r.style.setProperty('--main-color', 'darkmagenta');
    }

    const [form, setForm] = useState({});
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
    }

    const countries = Country.getAllCountries();
    const countryOptions = [];
    const stateOptions = [];
    countries.forEach(element => {
        let obj = new Object();
        obj.labelKey = element.isoCode;
        obj.value = element.name;
        countryOptions.push(obj);
    });


    useEffectOnce(() => {
        form.token = getRandomToken(20);
        console.log(form.token);
        form.opt = params.opt;
        var age = document.getElementById("age");
        var ageMin = document.getElementById("ageMin");
        var ageMax = document.getElementById("ageMax");
        var options = Array.from({ length: 100 - 18 }, (_, i) => i + 18)

        //ages
        for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            age.appendChild(el);
            el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            ageMin.appendChild(el);
            el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            ageMax.appendChild(el);
        }
    }, [])

    const onSuccess = (r, values) => {
        window.location.replace('/register/block?opt=' + params.opt + "&token=" + form.token)
    }

    const onError = (e) => {
        //window.location.replace('/register/block?opt=' + params.opt)
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = 'x-csrftoken'
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.withCredentials = true
        axios.post('/app/register/userdata/', form).then((s) => onSuccess(s)).catch((err) => onError(err.response.data));
    }

    const handleLocationChange = e => {
        setField("country", e.selectedKey);
        if (e.selectedKey.length > 0) {
            var cities = document.getElementById('cityPicker');
            var i, L = cities.options.length - 1;
            for (i = L; i >= 0; i--) {
                cities.remove(i);
            }
            let states = State.getStatesOfCountry(e.selectedKey[0]);
            states.forEach(element => {
                var el = document.createElement("option");
                el.textContent = element.name;
                el.value = element.isoCode;
                cities.appendChild(el);
            });

        }
    }

    return (
        <div id="register_container">
            <div className='title__container'>
                <h1 className='mt-4 title__'>REGÍSTRATE</h1>
            </div>

            <h2>Ingresa tus datos</h2>

            <form onSubmit={handleSubmit}>
                <div class="row">
                    <div class="col-12 col-sm-6">
                        <div className='form__container px-3 m-3 py-3'>
                            <Form.Group controlId='formName'>
                                <Form.Control type='text' placeholder='Nombre o Apodo' onChange={(e) => setField("name", e.target.value)} value={form.name} />
                            </Form.Group>
                            <div className='mt-2'>
                                <span>Datos Personales</span>
                            </div>
                            <div className='row py-2'>
                                <div className='col'>
                                    <Form.Group controlId='formAge'>
                                        <Form.Select selectedKey="0" id='age' placeholder='Edad' onChange={(e) => setField("age", e.target.value)} value={form.age}>
                                            <option value="" selected disabled hidden>Edad</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className='col'>
                                    <Form.Group controlId='formGender'>
                                        <Form.Select placeholder='Género' onChange={(e) => setField("gender", e.target.value)} value={form.gender}>
                                            <option value="" selected disabled hidden>Género</option>
                                            <option value="M">Hombre</option>
                                            <option value="F">Mujer</option>
                                            <option value="FTM">Hombre Trans</option>
                                            <option value="MTF">Mujer Trans</option>
                                            <option value="O">Otros</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>
                            {params.opt == 1 &&
                                <Form.Group controlId='formBodyType'>
                                    <Form.Select placeholder='Contextura' onChange={(e) => setField("body_type", e.target.value)}>
                                        <option value="" selected disabled hidden>Contextura</option>
                                        <option>Delgada</option>
                                        <option>Promedio</option>
                                        <option>Buen Cuerpo</option>
                                        <option>Gruesa</option>
                                    </Form.Select>
                                </Form.Group>
                            }
                        </div>
                    </div>
                    <div class="col-12 col-sm-6">
                        <div className='form__container px-3 m-3 py-3'>
                            <Form.Group controlId='formNationality'>
                                <BootstrapSelect className="location__container" placeholder="Nacionalidad" options={countryOptions} showSearch="true" onChange={(e) => setField("nationality", e.selectedKey)} />
                            </Form.Group>
                            <div className='mt-2'>
                                <span>Ubicación Actual</span>
                            </div>
                            <div className='row py-2'>
                                <div className='col'>
                                    <Form.Group controlId='formCountry'>
                                        <BootstrapSelect className="location__container" placeholder="País" options={countryOptions} showSearch="true" onChange={handleLocationChange} />
                                    </Form.Group>
                                </div>
                                <div className='col'>
                                    <Form.Group controlId='formCity'>
                                        <Form.Select className="location__container" id='cityPicker' onChange={(e) => setField("city", e.target.value)}>
                                            <option value="" selected disabled hidden>Ciudad</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h2>Cuéntanos tus preferencias</h2>

                <div className='form__container px-3 m-3 py-3'>
                    <span>RANGO DE EDAD</span>
                    <div className='row py-2'>
                        <div className='col'>
                            <Form.Group controlId='formAgeMin'>
                                <Form.Select id='ageMin' placeholder='Edad' onChange={(e) => setField("preferred_age_min", e.target.value)}>
                                    <option value="" selected disabled hidden>Edad Mínima</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group controlId='formAgeMax'>
                                <Form.Select id='ageMax' placeholder='Edad' onChange={(e) => setField("preferred_age_max", e.target.value)}>
                                    <option value="" selected disabled hidden>Edad Máxima</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                    <Form.Group controlId='formPreferredNationality'>
                        <BootstrapSelect className="location__container" placeholder="Nacionalidad preferida" options={countryOptions} showSearch="true" onChange={(e) => setField("preferred_nationality", e.selectedKey)} />
                    </Form.Group>
                    <div className='row py-2'>
                        <div className='col'>
                            <Form.Group controlId='formPreferredGender'>
                                <Form.Select placeholder='Género' onChange={(e) => setField("preferred_gender", e.target.value)}>
                                    <option value="" selected disabled hidden>Género</option>
                                    <option value="M">Hombre</option>
                                    <option value="F">Mujer</option>
                                    <option value="FTM">Hombre Trans</option>
                                    <option value="MTF">Mujer Trans</option>
                                    <option value="T">Todos</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        {params.opt == 0 &&
                            <div className='col'>
                                <Form.Group controlId='formPreferredBodyType'>
                                    <Form.Select placeholder='Contextura' onChange={(e) => setField("preferred_body", e.target.value)}>
                                        <option value="" selected disabled hidden>Contextura</option>
                                        <option>Delgada</option>
                                        <option>Promedio</option>
                                        <option>Buen Cuerpo</option>
                                        <option>Gruesa</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        }
                    </div>
                </div>
                <h2> {params.opt == 0 ? 'Indica tu presupuesto mensual' : 'Expectativa mensual'} </h2>
                <div className='px-3'>
                    <ReactSlider
                        min={100}
                        max={4000}
                        step={100}
                        className="horizontal-slider"
                        thumbClassName="slider-thumb"
                        trackClassName="slider-track"
                        onChange={(e) => setField("money", e)}
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    />
                </div>

                <div className='mt-5'>
                    <div className='options__container'>
                        <img className='img__ball' src='https://img.freepik.com/free-photo/beautiful-girl-stands-near-walll-with-leaves_8353-5377.jpg?w=2000' />
                        <img className='img__ball' src='https://i.pinimg.com/736x/28/42/c9/2842c9d941fc16ca9e0f34d148c1c33c.jpg' />
                        <img className='img__ball' src='https://media.istockphoto.com/id/846730696/photo/portrait-teenager.jpg?b=1&s=170667a&w=0&k=20&c=PNz3dsppr_Q0s_dNI_LaZdoY0oQtH812tvwZ13n-ods=' />
                        <div className='options__'>
                            <h4 className=''>+256 {params.opt == 0 ? 'BABYS' : 'SUGARS'}</h4>
                        </div>
                    </div>
                    <h4>Están esperando por ti</h4>
                </div>

                <div className='btn__container mb-4'>
                    <Button type='submit'>
                        CONECTA YA!
                    </Button>
                </div>

            </form>
        </div>
    )
}
