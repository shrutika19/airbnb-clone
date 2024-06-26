import React, { useEffect, useState } from 'react'
import PerksCheckbox from '../components/PerksCheckbox';
import TimeDetails from '../components/TimeDetails';
import PhotoUpload from '../components/PhotoUpload';
import axios from 'axios';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import { validateAccommodationForm } from '../validation';

const AccommodationForm = () => {
    const { id } = useParams();
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [perks, setPerks] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);
    const [validationErrors, setValidationErrors] = useState({});


    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(res => {
            const { data } = res;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.addedPhotos);
            setDescription(data.description);
            setPerks(data.perks);
            setAdditionalInfo(data.additionalInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id]);

    const inputHeader = (text) => {
        return (
            <h2 className='text-xl mt-4 font-semibold'>{text}</h2>
        )
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title, address, addedPhotos, description, perks, additionalInfo, checkIn, checkOut, maxGuests, price
        }

        // Validation
        const errors = validateAccommodationForm(formData);
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        if (id) {
            //update the form
            await axios.put('/places', {
                id, ...formData
            });
            setRedirect(true);
        } else {
            //add new data 
            await axios.post('/places', formData);
            setRedirect(true);
        }

    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <>
            <AccountNav />
            <div className="max-w-4xl mx-auto border border-gray-300 p-4 rounded-lg shadow-md">
                <form onSubmit={handleFormSubmit}>
                    {inputHeader('Title')}
                    <input
                        type='text'
                        placeholder='title, for example: Beautiful villa'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className={validationErrors.title ? 'border-red-500' : ''}
                    />
                    {validationErrors.title && <p className="text-red-500 italic">{validationErrors.title}</p>}


                    {inputHeader('Address')}
                    <input
                        type='text'
                        placeholder='address'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className={validationErrors.address ? 'border-red-500' : ''}
                    />
                    {validationErrors.address && <p className="text-red-500 italic">{validationErrors.address}</p>}


                    {inputHeader('Photos')}
                    <PhotoUpload addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    {inputHeader('Description')}
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className={validationErrors.description ? 'border-red-500' : ''}

                    />
                    {validationErrors.description && <p className="text-red-500 italic">{validationErrors.description}</p>}


                    {inputHeader('Perks')}
                    <PerksCheckbox selected={perks} onChange={setPerks} />

                    {inputHeader('Additional Information')}
                    <textarea value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} />

                    {inputHeader('Details')}
                    <TimeDetails
                        checkIn={checkIn}
                        setCheckIn={setCheckIn}
                        checkOut={checkOut}
                        setCheckOut={setCheckOut}
                        maxGuests={maxGuests}
                        setMaxGuests={setMaxGuests}
                        price={price}
                        setPrice={setPrice}
                    />



                    <button className='primary my-4'>Save</button>
                </form>
            </div>
        </>

    )
}

export default AccommodationForm