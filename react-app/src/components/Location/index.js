import React from 'react';

const Location = () => {

    const { location } = useSelector(state => {
        return state.selectedLocation
    })

    return (
        <div className='location'>
                <h1>{location.name}</h1>
                <div>
                    <p>{location.description}</p>
                </div>
        </div>
    )
}