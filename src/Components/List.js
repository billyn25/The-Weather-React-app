import React, {useEffect, useState,useContext} from "react"
import axios from 'axios'
import {apiKey} from '../Complementos/apiKey'
import LoadingSpinner from "../Complementos/LoadingSpinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faTint } from '@fortawesome/free-solid-svg-icons'
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons'
import { faTemperatureHigh} from '@fortawesome/free-solid-svg-icons'
import { faTachometerAlt} from '@fortawesome/free-solid-svg-icons'
import {ContextApiId} from '../Complementos/Context'
var moment = require('moment');

export default function List({datos,countryCode,favoriteStatus,indice}) {

    const {selecId,deleteforIndex} = useContext(ContextApiId)

    const [loading, setLoad] = useState(true);
    const [dataHour, setDataHour] = useState('');
    const {main,name,weather,clouds,sys,wind,id} = datos

    useEffect(() => {
            setLoad(true)
            setTimeout(() => {
                setLoad(false)
                getData()
            }, 1300);
        },
        [datos],
    );

    let getData = async () => {

        let url;
        if (id && id!=='') {
            url= `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${apiKey}&lang=es&units=metric&cnt=8`
        } else {
            url= `https://api.openweathermap.org/data/2.5/forecast?q=${name},${countryCode}&appid=${apiKey}&lang=es&units=metric&cnt=8`
        }

        await axios.get(url)
            .then(function (response) {
                let {list} = response.data
                setDataHour(list)
            })
            .catch(function (error) {
            });
    }

    let favorite =(n,cp,id) =>{

        let objeto = {
            id:id,
            city:n,
            country:cp,
        }

        selecId(objeto)
    }

    let deleteforId =(indice) =>{

        deleteforIndex(indice)
    }

    let checkFav = () => {

        let arrayFav = JSON.parse(localStorage.getItem('id')) || []
        const found = arrayFav.some(el => el.city === name);
        if (!found) {
            return true
        }
    }

    return (
        loading ? <LoadingSpinner /> :
            <React.Fragment>
                <div className="card">
                    <header className="w-100 text-right">
                        {favoriteStatus!=='true' && (
                        <button className={checkFav()?"btn-sm btn-warning m-0 pl-2 pr-2 pt-1 pb-1":"disable btn-sm m-0 pl-2 pr-2 pt-1 pb-1"} onClick={()=>favorite(name,sys.country,id)}>
                            <i className="fa fa-star text-white"></i>
                        </button>)}
                        {favoriteStatus==='true' && (
                        <button className="btn-sm btn-danger m-0 pl-2 pr-2 pt-1 pb-1" onClick={()=>deleteforId(indice)}>
                            <i className="fa fa-times"></i>
                        </button>)}
                    </header>
                    <div className="d-flex justify-content-between align-items-center pr-3">
                        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="logo" width="120"
                             height="auto"/>
                        <p className="badge badge-danger p-2 text-white"><i
                            className="fa fa-thermometer-half"></i> {main.temp.toString().substring(0, main.temp.toString().indexOf("."))}°C </p>
                    </div>
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{name}, {sys.country}</h5>
                    </div>
                    <ul className="list-group list-group-flush text-white">
                        <li className="list-group-item bg-light border text-dark font-weight-bold">{weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)},
                            <i className="fa fa-cloud ml-2 mr-1"></i>{clouds.all}%
                        </li>
                        <li className="list-group-item bg-dark"><FontAwesomeIcon icon={faTemperatureLow}/> {main.temp_min.toString().substr(0, 2)}°C
                            <FontAwesomeIcon icon={faTemperatureHigh} className="ml-3"/> {main.temp_max.toString().substr(0, 2)}°C
                        </li>
                        <li className="list-group-item bg-dark"><FontAwesomeIcon
                            icon={faTint}/> {main.humidity}%<FontAwesomeIcon icon={faWind} className="ml-3"/> {wind.speed} m/s<FontAwesomeIcon
                            icon={faTachometerAlt} className="ml-3"/> {main.pressure} hpa
                        </li>
                        <li className="list-group-item d-flex justify-content-center">
                            <ul className="d-flex flex-wrap">
                            {Object.keys(dataHour || {}).map((key,index) => (
                                    <li key={index} className="list d-flex flex-column border justify-content-center align-items-center">
                                        <img src={`http://openweathermap.org/img/wn/${dataHour[key].weather[0].icon}@2x.png`} alt="logo" width="30"
                                         height="auto"/>
                                         <p className="text-dark mb-1">{`${moment(dataHour[key].dt *1000).format('H')}`}</p>
                                        <p className="text-dark mb-0 text-muted small">{dataHour[key].main.temp.toString().substring(0, dataHour[key].main.temp.toString().indexOf("."))}°</p>
                                    </li>
                            ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
    )
}
