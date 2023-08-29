import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Patterns({user}) {

    const [patterns, setPatterns] = useState([])
    let navigate = useNavigate()

     useEffect(() => {
        getPatterns()
    }, [])

    const getPatterns = async () => {
        let url = `http://localhost:6969/p/user/${user._id}`
        const response = await axios.get(url)
        console.log(response.data)
        setPatterns(response.data)
    }

    const deletePattern = async (id) => {
        let url = `http://localhost:6969/p/${id}`
        const response = await axios.delete(url)
        if (response.data) {
            getPatterns()
        }
    }

    return (
        patterns?.map(pattern => {
            return (
                <div>
                    <h1><Link to={`../pattern/${pattern._id}`}>{pattern.name}</Link></h1>
                    <button onClick={() => deletePattern(pattern._id)}>Delete</button>
                </div>
            )
        }
    )
    )
}

export default Patterns