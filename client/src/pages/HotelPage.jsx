import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';


const HotelPage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showallPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (!id) {
            return
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        })
    }, [id])

    if (!place) return '';

    if (showallPhotos) {
        return (

            <div className='absolute bg-white min-h-screen'>
                <div className='fixed top-0 left-0 z-10 w-full bg-white flex items-center justify-between px-4 py-2'>
                    <div className='gap-1'>
                        <button onClick={() => setShowAllPhotos(false)} className=' gap-1 px-4 rounded-2xl py-2 bg-white' title='Back'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                    <div >
                        <button class="gap-2 flex bg-white">  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                            <span class="underline font-semibold">Share</span>
                        </button>
                    </div>
                </div>
                <br />

                <div className='p-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                        <div className="md:col-span-1 xl:col-span-1">
                            <h2 className="text-xl font-semibold">Photo tour</h2>
                            <p className='mt-9  '>{place.description}</p>
                        </div>
                        <div className="md:col-span-2 xl:col-span-2 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                            {place?.addedPhotos?.length > 0 && place.addedPhotos.map(photo => (
                                <div key={photo}>
                                    <img src={'http://localhost:3000/uploads/' + photo} alt='' className='object-cover aspect-square' />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div className='mt-8 bg-gray-100 -mx-8 px-8 py-8'>
            <h1 className='text-2xl'>{place.title}</h1>
            <a className=' my-2 block font-semibold underline' target='_blank' href={'https://maps.google.com/?q=' + place.address}>{place.address}</a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr]">
                    <div>
                        {place.addedPhotos?.[0] && (
                            <div>
                                <img className='aspect-square object-cover' src={'http://localhost:3000/uploads/' + place.addedPhotos[0]} alt='' />

                            </div>
                        )}
                    </div>
                    <div className='grid'>
                        {place.addedPhotos?.[1] && (
                            <img className='aspect-square object-cover' src={'http://localhost:3000/uploads/' + place.addedPhotos[1]} alt='' />
                        )}
                        <div className=' overflow-hidden '>
                            {place.addedPhotos?.[2] && (
                                <img className='aspect-square object-cover relative top-2' src={'http://localhost:3000/uploads/' + place.addedPhotos[2]} alt='' />
                            )}
                        </div>
                    </div>
                    <button onClick={() => setShowAllPhotos(true)} className='absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 '>
                        <FontAwesomeIcon icon={faImage} />
                        <span style={{ marginLeft: '3px' }}>Show More Photos</span>
                    </button>

                </div>
            </div>
        </div>




    )
}

export default HotelPage