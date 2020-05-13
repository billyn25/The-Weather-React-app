import React,{useState} from "react"
import Autosuggest from 'react-autosuggest';
import {countries} from '../Complementos/arrayCountry'

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : countries.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.code;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.code} - {suggestion.name}
    </div>
);

export default function Form({dataF}) {

    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    let onChange = (event, {newValue}) => {
        setValue(newValue)
    };

    let onSuggestionsFetchRequested = ({value}) => {
        setSuggestions(getSuggestions(value))
    };

    let onSuggestionsClearRequested = () => {
        setSuggestions([])
    };

    const inputProps = {
        placeholder: 'Codigo de Pais; ES, FR, IT, UK ... *',
        value,
        onChange: onChange,
    };

    const [city, setCity] = useState('');
    const [statusCity, setStatusCity] = useState(true);
    const [statusCountry, setStatusCountry] = useState(true);

    let envio = (e) => {
        e.preventDefault()

        city===''?setStatusCity(false):setStatusCity(true);
        value===''?setStatusCountry(false):setStatusCountry(true);

        if (city && value) {

            let obj = {
                city:city,
                country:value
            }
            //send app js data
            dataF(obj)
        }
    }

    //coger localización
    let getLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(mostrarUbicacion);
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        function mostrarUbicacion(ubicacion) {
            const lng = ubicacion.coords.longitude;
            const lat = ubicacion.coords.latitude;

            let obj = {
                lng : lng,
                lat : lat,
                location: true
            }
            dataF(obj)
        }

    }

    return (
        <div className="d-flex justify-content-center">
        <form onSubmit={envio}>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-5">
                    <input type="text" value={city} placeholder="Ciudad o Codigo Postal *"
                           onChange={(e) => setCity(e.target.value)} className="form-control"/>
                    <div className={!statusCity?"mt-1 font-weight-bold small text-danger ":"font-weight-bold d-none"}>Rellena la ciudad</div>
                </div>
                <div className="form-group col-md-5">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        required
                    />
                    <div className={!statusCountry?"mt-1 font-weight-bold small text-danger ":"font-weight-bold d-none"}>Rellena el código del pais</div>
                </div>
                <div className="form-group col-md-2 d-flex justify-content-center">
                    <button type="submit" className="pl-3 pr-3 btn lupa btn-danger w-75"><i className="fa fa-search"></i></button>
                    <button type="button" className="ml-3 pl-3 pr-3 btn lupa btn-danger w-75" onClick={getLocation}><i className="fa fa-location-arrow"></i></button>
                </div>
            </div>
        </form>
        </div>
    )
}
