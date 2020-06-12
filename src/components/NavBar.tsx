import React from "react";
import { Link } from 'react-router-dom';

import "./navBar.css"

const NavBar = () => {

    return (
        <ul className="navigation left">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Group">Group</Link></li>
            <li><Link to="/CodeRoom">Code Room</Link></li>
        </ul>
    )
}

export default NavBar