import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PerksCheckbox from '../components/PerksCheckbox';
import TimeDetails from '../components/TimeDetails';
import PhotoUpload from '../components/PhotoUpload';

const AccommodationPage = () => {
    const { action } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [perks, setPerks] = useState([]);


    const inputHeader = (text) => {
        return (
            <h2 className='text-xl mt-4 font-semibold'>{text}</h2>
        )
    }

    return (
        <>
            {
                action !== 'new' && (
                    <div className='text-center'>
                        <Link className=' inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add new places
                        </Link>
                    </div>
                )
            }

            {
                action === 'new' && (
                    <div>
                        <form>
                            {inputHeader('Title')}
                            <input
                                type='text'
                                placeholder='title, for example: Beautiful villa'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />

                            {inputHeader('Address')}
                            <input
                                type='text'
                                placeholder='address'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />

                            {inputHeader('Photos')}
                            <PhotoUpload />

                            {inputHeader('Description')}
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />

                            {inputHeader('Perks')}
                            <PerksCheckbox selected={perks} onChange={setPerks} />

                            {inputHeader('Additional Information')}
                            <textarea value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} />

                            {inputHeader('Details')}
                            <TimeDetails />

                            <button className='primary my-4'>Save</button>
                        </form>
                    </div>
                )
            }
        </>
    )
}

export default AccommodationPage