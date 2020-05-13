import React, {useState,useEffect} from "react"
import './App.css';
import Form from "./Components/Form";
import SearchContent from "./Components/SearchContent";
import PrincipalContent from "./Components/PrincipalContent";
import Footer from "./Components/Footer";
import {ContextApiId} from './Complementos/Context'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FavoriteComponent from "./Components/FavoriteComponent";
import Navbar from "./Components/Navbar";

function IndexPage() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);

    useEffect(() => {
            setData(JSON.parse(localStorage.getItem('id')) || []);
        },
        [],
    );

    //word and country code for form component
    let dataFun = (c) => {
        console.log(c)
        setSearch(c)
    }

    let selecId = (ob) => {

        //check if exist duplicate and add new
        function add(arr, city) {
            const found = arr.some(el => el.city === city);
            if (!found) {
                arr.push({id:ob.id, city: ob.city, country: ob.country});
                setAlert(true)
                setAlertMessage({type:'alert-success',message:`Ciudad ${ob.city} añadida a favoritos`})
            } else {
                setAlert(true)
                setAlertMessage({type:'alert-danger',message:'Ciudad duplicada'})
            }
            return arr;
        }

        localStorage.setItem('id', JSON.stringify(add(data, ob.city)));

        setTimeout(() => {
            setAlert(false)
        }, 2000);

    }

    //delete for index and update localstore
    let deleteforIndex = (i) => {

        let filterArray = data.filter((key,index) => index !== i)
        setData(filterArray)
        localStorage.setItem('id', JSON.stringify(filterArray));
    }

    return (
        <ContextApiId.Provider value={{selecId,deleteforIndex}}>
            <BrowserRouter>
                <div className={alert ? `fixed-top alert ${alertMessage.type} fade show` : "d-none fade out"}>
                    <strong>{alertMessage.message}</strong>
                </div>
                <div className="jumbotron">
                    <h1 className="mb-4 text-dark text-center font-weight-bold">
                        <a href="/"><img src="https://images-na.ssl-images-amazon.com/images/I/51ZF%2BmT3QZL.png"
                                         width="70" height="70" alt="icon" className="mr-3"/>
                            The Weather React app</a></h1>
                    <Form dataF={dataFun}/>
                </div>
                <Switch>
                    <React.Fragment>
                    <section className="Seccion-principal">
                        <Navbar dataF={dataFun}/>
                        {search!=='' ? <SearchContent datos={search}/> :
                            <React.Fragment>
                                <Route exact path="/" render={() => <PrincipalContent/>}/>
                                <Route exact path="/favoritos" render={() => <FavoriteComponent datos={data}/>}/>
                            </React.Fragment>
                        }
                    </section>
                    </React.Fragment>
                </Switch>
                <Footer/>
            </BrowserRouter>
        </ContextApiId.Provider>
    )
}

export default IndexPage;
