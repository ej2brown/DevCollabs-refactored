import React from "react";
import { Link } from "react-router-dom";

import "./navBar.css";

class NavBar extends React.Component {
    render() {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item"><Link to="/">Home</Link></li>
                <li className="nav-item"><Link to="/Group">Group</Link></li>
                <li className="nav-item"><Link to="/CodeRoom">Code Room</Link></li>
            </ul>
        );
    }
}
export default NavBar;