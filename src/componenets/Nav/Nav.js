import React from 'react';
import 'tachyons';
import './Nav.css'

const Nav = () => {
    return(
        <nav className="navbar">
            <p className="f3 link dim black underline pa3 pointer">SignIn/SignUp</p>
            <p className="f3 link dim black underline pa3 pointer">Log Out</p>
        </nav>
    )
}

export default Nav