import React, { useState } from 'react'

function Login() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [message,setMessage] = useState("")

    const submitForm = () => {
        //post to API
        //if success, redirect to home
        //if err, show err message
    }

    return (
        <div>
            <form>
                <input type='text' value={username} onChange={(evt)=> setUsername(evt.target.value)} />
                <input type='password' value={password} onChange={(evt)=> setPassword(evt.target.value)} />
                <input type='submit' />
            </form>
            <p>{message}</p>
            <p>Need an account? <a href='/register'>Register here</a></p>
        </div>
    )
}

export default Login