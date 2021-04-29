import React from 'react'
import Logo from '../../Utils/logo1.png'
import './Navbar.css'
export default function Navbar(props) {
    return (
        <nav class="fixed-nav-bar">
         
        <a class="brand">
        <center>
                        
                        <h2 onClick={() => props.redirect()}><img src={Logo} class={"logo-1"} alt=""/>CoAid.live</h2>
                        </center>
        </a>
      
      </nav>
    )
}
