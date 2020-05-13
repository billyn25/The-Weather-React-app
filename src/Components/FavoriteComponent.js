import React from "react"
import FavoriteSearch from "./FavoriteSearch";
export default function FavoriteComponent({datos}) {

    return (
        <React.Fragment>
            {window.location.pathname.includes("favoritos") && (
            <div className="mt-5 d-flex justify-content-center">
                <h3 className="mobile text-white bg-warning w-auto text-center p-2">CIUDADES FAVORITAS</h3>
            </div>)}
            <div className="content d-flex justify-content-center align-items-center">
            {datos.length>0 ?
                    Object.keys(datos).map((key,i) => (
                     <FavoriteSearch datos={datos[key]} indice={i}/>))
                :<h4 className="text-danger">No hay Favoritos</h4>}
                </div>
        </React.Fragment>
    )
}
