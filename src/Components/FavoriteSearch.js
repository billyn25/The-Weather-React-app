import React, {useEffect, useState} from "react"
import axios from 'axios'
import List from "./List";
import {apiKey} from '../Complementos/apiKey'

function FavoriteSearch({datos,indice}) {

    const [data, setData] = useState('');
    const {city,country,id} = datos

    useEffect(() => {
            getData()
        },
        [datos],
    );

    let getData = async () => {

        let url;
        if (id && id!=='') {
            url =`https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&lang=es&appid=${apiKey}`
        } else {
            url =`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=es`
        }

        await axios.get(url)
            .then(function (response) {
                setData(response.data)
            })
            .catch(function (error) {
            });
    }

    return (
        <React.Fragment>
            <List datos={data} countryCode={country} favoriteStatus="true" indice={indice}/>
        </React.Fragment>
    )
}

export default FavoriteSearch;
