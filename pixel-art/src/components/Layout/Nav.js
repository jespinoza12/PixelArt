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
            <button>Export Canvas</button>
            <button>Export Pattern</button>
            <button>Login</button>
        </nav>
    )
}

export default Nav