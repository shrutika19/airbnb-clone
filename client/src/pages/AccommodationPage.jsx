import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AccommodationForm from './AccommodationForm';
import AccountNav from '../components/AccountNav';
import axios from 'axios';


const AccommodationPage = () => {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlaces(data);
        })
    }, [])
    return (
        <>
            <AccountNav />
            <div className='text-center'>
                <Link className=' inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Add new places
                </Link>
            </div>
            <div className='mt-4'>
                {places.length > 0 && places.map((place, index) => (
                    <Link key={index} to={'/account/places/' + place._id} className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'>
                        <div className='flex w-32 h-32 bg-gray-300 grow shrink-0'>
                            {place.addedPhotos.length > 0 && (
                                <img className='object-cover' src={'http://localhost:3000/uploads/' + place.addedPhotos[1]} alt='' />
                            )}
                        </div>
                        <div className='grow-0 shrink'>
                            <h2 className='text-xl'> {place.title}</h2>
                            <p className='text-sm mt-2'>{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default AccommodationPage