import React from 'react'
import "./Nav.scss"

function Nav({user}) {

    if (user?.id) {
        return (
            <nav>
                <a>My Patterns</a>
                <a>My Canvases</a>
                <a>Log out</a>
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