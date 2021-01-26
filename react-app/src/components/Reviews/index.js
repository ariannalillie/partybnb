import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom"

function AllReviews() {
    let {id} = useParams()
    const [reviews, setReviews] =useState([])
    useEffect(async() => {
        const res = await fetch(`/api/reviews/${id}`)
        const data = await res.json()
    })

    return (
        <div>
            <h4>User Reviews</h4>
            
        </div>
    )


}