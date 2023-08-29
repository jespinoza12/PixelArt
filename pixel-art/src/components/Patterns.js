import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Patterns({user}) {

    const [patterns, setPatterns] = useState([])
    let navigate = useNavigate()

     useEffect(() => {
        getPatterns()
    }, [])

    const getPatterns = async () => {
        const response = await axios.get(`http://localhost:6969/p/user/${sessionStorage.getItem("id")}`)
        console.log(response.data)
        setPatterns(response.data)
    }

    return (
        patterns?.map(pattern => {
            return (
                <div>
                    <h1>{pattern.name}</h1>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )
        }
    )
    )
}

export default Patterns