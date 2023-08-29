import React, { useEffect } from 'react'
import "./Nav.scss"
import axios from 'axios'

function Nav({user,setUser}) {

    const handleLogout = async () => {
        setUser({})
        const result = await axios.get("http://localhost:6969/u/logout")
        console.log("Logout",result.data)
    }

    if (user?._id) {
        return (
            <nav>
                <a>My Patterns</a>
                <a>My Canvases</a>
                <a onClick={handleLogout} href='/'>Log out</a>
            </nav>
        )
    }

    return (
        <nav>
            <a href='/canvas'>Draw</a>
            <a href='/pattern'>Pattern</a>
            <a href='/login'>Login</a>
        </nav>
    )
}

export default Nav