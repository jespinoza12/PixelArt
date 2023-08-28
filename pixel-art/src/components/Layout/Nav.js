import React from 'react'
import "./Nav.scss"

function Nav({user}) {

    if (user) {
        return (
            <nav>
                <button>Save Canvas</button>
                <button>Save Pattern</button>
                <button>My Patterns</button>
                <button>My Canvases</button>
                <button>Log out</button>
            </nav>
        )
    }

    return (
        <nav>
            <a href='/canvas'>Draw</a>
            <a href='/pattern'>Pattern</a>
            <a href='/'>Login</a>
        </nav>
    )
}

export default Nav