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

    return (
        patterns?.map(pattern => {
            return (
                <div>
                    <h1><Link to={`../pattern/${pattern._id}`}>{pattern.name}</Link></h1>
                </div>
            )
        }
    )
    )
}

export default Patterns