import React from "react"
import { NavLink } from 'react-router-dom';
export default function Navbar({dataF}) {

    let deleteSearch = () => {
        dataF('')
    }

    return (
        <nav className="navbar navbar-light bg-dark d-flex m-0 p-0">
                <ul className="d-flex mb-0">
                    <li className="nav-item">
                        <NavLink exact activeClassName="is-active" className="p-3 nav-link text-white" to="/" onClick={deleteSearch}><i
                            className="fa fa-home"></i> home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="is-active" className="p-3 nav-link text-white" to="/favoritos" onClick={deleteSearch}><i
                            className="fa fa-star"></i> Favoritos</NavLink>
                    </li>
                </ul>
        </nav>
    )
}
