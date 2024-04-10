import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddressLink from '../components/AddressLink';
import BookingDates from '../components/BookingDates';

const BookingPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            })
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <div className='my-8'>
            <h1 className='text-2xl'>{booking.place.title}</h1>
            <AddressLink  >{booking.place.address} </AddressLink>
            <div className='bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl mb-4'>Your booking information</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className='bg-primary px-8 py-2 rounded-2xl'>
                    <div>  Total Price</div>
                    <div className='text-2xl'>  ₹{booking.price}</div>
                </div>
            </div>
        </div>
    )
}

export default BookingPage