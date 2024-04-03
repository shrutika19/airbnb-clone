import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'

const IndexPage = () => {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([...response.data, ...response.data, ...response.data, ...response.data, ...response.data, ...response.data]);
            console.log(response.data)
        })
    }, [])
    return (
        <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {places.length > 0 && places.map((place, index) => (
                <div key={index}>
                    <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                        {place.addedPhotos?.[0] && (
                            <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:3000/uploads/' + place.addedPhotos?.[0]} alt="" />
                        )}
                    </div>
                    <h2 className='text-sm truncate leading-4'> {place.title}</h2>
                    <h3 className='font-semibold '>{place.address}</h3>
                </div>
            ))}
        </div>
    )
}

export default IndexPage