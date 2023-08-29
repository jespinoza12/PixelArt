import React, { useEffect } from 'react'
import "./Nav.scss"
import axios from 'axios'
import { Link } from 'react-router-dom'

function Nav({user,setUser}) {

    const handleLogout = async (evt) => {
        evt.preventDefault()
        setUser({})
        const result = await axios.get("http://localhost:6969/u/logout")
        console.log("Logout",result.data)
    }

    useEffect(() => {
        console.log(user) 
    },[user])

    if (user?._id) {
        return (
            <nav>
                <Link to="../allPatterns">My Patterns</Link>
                <Link to='../allCanvases'>My Canvases</Link>
                <Link to='../canvas'>Draw</Link>
                <Link to='../pattern'>Pattern</Link>
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