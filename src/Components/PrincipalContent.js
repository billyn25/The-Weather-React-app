import React, {useEffect, useState} from "react"
import axios from 'axios'
import List from "./List";
import {apiKey} from '../Complementos/apiKey'

function PrincipalContent() {
    const [data, setData] = useState('');

    useEffect(() => {
            getData()
        },
        [],
    );

    let getData = async () => {

        await axios.get(`http://api.openweathermap.org/data/2.5/group?id=3117735,3110044,3128760,2510409,2510911,3106672,3119841,3121424,3109718,3109256,6355632,3121070&units=metric&lang=es&appid=${apiKey}`)
            .then(function (response) {
                let {list} = response.data
                setData(list)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <React.Fragment>
            <div className="mt-5 d-flex justify-content-center">
                <h3 className="mobile text-white bg-danger w-auto text-center p-2">Principales Ciudades Españolas</h3>
            </div>
            <div className="content d-flex justify-content-center align-items-center">
            {Object.keys(data).map((key,index) => (
                <List datos={data[key]} key={index}/>
                ))}
            </div>
        </React.Fragment>
    )
}

export default PrincipalContent;
