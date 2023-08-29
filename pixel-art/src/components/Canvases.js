import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Canvases({user}) {

    const [canvases, setCanvases] = useState([])

    useEffect(() => {
        getCanvases()
    }, [])

    const getCanvases = async () => {
        const response = await axios.get(`http://localhost:6969/c/user/${sessionStorage.getItem("id")}`)
        if (response.data) {
            setCanvases(response.data)
        }
        console.log(canvases)
    }

    return (
        canvases?.map(canvas => {
            return (
                <div>
                    <h1>{canvas.name}</h1>
                    <p>{canvas.pallet}</p>
                    <p>{canvas.size.width}</p>
                    <p>{canvas.size.height}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )
        }
    )
    )
}

export default Canvases