import React, {useEffect, useState} from "react"
import axios from 'axios'
import List from "./List";
import {apiKey} from '../Complementos/apiKey'
let longitud
let latitud

function SearchContent({datos}) {

    const [data, setData] = useState('');
    const [error, setError] = useState(false);

    const {city,country,lng,lat,location} = datos

    useEffect(() => {
            getData()
        },
        [datos],
    );

    let getData = async () => {

        let url;
        if (datos.location) {
            longitud = lng.toString().substr(0,5)
            latitud = lat.toString().substr(0,5)

            console.log(location)
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric&lang=es`
        } else {

            if (!isNaN(city)) {
                url = `https://api.openweathermap.org/data/2.5/weather?zip=${city},${country}&appid=${apiKey}&units=metric&lang=es`
            } else {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=es`
            }
        }

        await axios.get(url)
            .then(function (response) {
                setData(response.data)
                setError(false)
            })
            .catch(function (error) {
                setError(true)
            });
    }

    return (
        <React.Fragment>
            <div className="mt-5 text-center">
                <h3 className="mobile text-dark">Resultado: Tiempo en {data.name} {country}</h3>
            </div>
            <div className="content d-flex justify-content-center align-items-center">
                {!error?<List datos={data} countryCode={country}/>:<h4 className="text-danger">No hay resultados para la búsqueda</h4>}
            </div>
        </React.Fragment>
    )
}

export default SearchContent;
