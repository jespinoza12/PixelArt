import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Canvases({user}) {

    const [canvases, setCanvases] = useState([])

    useEffect(() => {
        console.log(user)
        getCanvases()
    }, [])

    const getCanvases = async () => {
        let url = `http://localhost:6969/c/user/${user._id}`
        const response = await axios.get(url)
        if (response.data) {
            setCanvases(response.data)
        }
        console.log(canvases)
    }

    const deleteCanvas = async (id) => {
        let url = `http://localhost:6969/c/${id}`
        const response = await axios.delete(url)
        if (response.data) {
            getCanvases()
        }
    }

    return (
        canvases?.map(canvas => {
            return (
                <div>
                    <h1>{canvas.name}</h1>
                    <p>{canvas.pallet}</p>
                    <p>{canvas.size.width}</p>
                    <p>{canvas.size.height}</p>
                    <button><Link to={`../canvas/${canvas._id}`}>Edit</Link></button>
                    <button onClick={() => deleteCanvas(canvas._id)}>Delete</button>
                </div>
            )
        }
    )
    )
}

export default Canvases