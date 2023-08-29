import React, { useState } from 'react'
import axios from "axios"

function Register() {
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [message,setMessage] = useState("")
    
    axios.defaults.withCredentials = true;

    const submitForm = async (evt) => {
        evt.preventDefault();
        const body = {email,username,password,passwordConfirm:confirmPassword}
        console.log(body)
        const response = await axios.post("http://localhost:6969/u/register",body)
        console.log(response)
        //if success, redirect to login
        //if err, show err message
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <label htmlFor='username'>Username</label>
                <input id="username" type='text' value={username} onChange={(evt)=> setUsername(evt.target.value)} />
                <br />
                <label htmlFor='email' >Email</label>
                <input id='email' type='text' value={email} onChange={(evt)=> setEmail(evt.target.value)} />
                <br />
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' value={password} onChange={(evt)=> setPassword(evt.target.value)} />
                <br />
                <label htmlFor='confirm'>Confirm Password</label>
                <input id='confirm' type='password' value={confirmPassword} onChange={(evt)=> setConfirmPassword(evt.target.value)} />
                <br />
                <input onClick={submitForm} value='Login' type='submit' />
            </form>
            <p>{message}</p>
            <p>Need an account? <a href='/register'>Register here</a></p>
        </div>
    )
}

export default Register