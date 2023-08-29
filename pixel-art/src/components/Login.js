import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login({setUser}) {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [message,setMessage] = useState("")

    
    let navigate = useNavigate()
    

    //axios.defaults.withCredentials = true;

    const submitForm = async (evt) => {
        evt.preventDefault()
        const body = {email,password}
        console.log(body)
        const response = await axios.post("http://localhost:6969/u/login",body)
        console.log(response)
        if (response.data.success) {
            console.log(response.data.user)
            setUser(response.data.user)
            navigate("/")
        }
        //if success, redirect to login
        //if err, show err message
        //post to API
        //if success, redirect to home
        //if err, show err message
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <label htmlFor='email' >Email</label>
                <input id='email' type='text' value={email} onChange={(evt)=> setEmail(evt.target.value)} />
                <br />
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' value={password} onChange={(evt)=> setPassword(evt.target.value)} />
                <br />
                <input onClick={submitForm} value='Login' type='submit' />
            </form>
            <p>{message}</p>
            <p>Need an account? <a href='/register'>Register here</a></p>
        </div>
    )
}

export default Login