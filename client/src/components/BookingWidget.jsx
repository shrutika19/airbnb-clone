import React, { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from "date-fns";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const ReservationForm = ({ place }) => {
    // Get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Get the date for 8 days from today
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 8);
    const nextWeekDate = nextWeek.toISOString().split('T')[0];

    // State variables for check-in and check-out dates
    const [checkInDate, setCheckInDate] = useState(today);
    const [checkOutDate, setCheckOutDate] = useState(nextWeekDate);
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('')
    const [redirect, setRedirect] = useState('');

    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])

    let numberOfNights = 0;
    if (checkInDate && checkOutDate) {
        numberOfNights = differenceInCalendarDays(new Date(checkOutDate), new Date(checkInDate));
    }

    // Handle change in check-in date
    const handleCheckInChange = (e) => {
        const selectedDate = e.target.value;
        setCheckInDate(selectedDate);

        // Ensure check-out date is not before the selected check-in date
        if (selectedDate > checkOutDate) {
            setCheckOutDate(selectedDate);
        }
    };

    // Handle change in check-out date
    const handleCheckOutChange = (e) => {
        const selectedDate = e.target.value;
        console.log(selectedDate)
        setCheckOutDate(selectedDate);
    };

    const bookingHandler = async () => {
        const response = await axios.post('/bookings', {
            checkInDate, checkOutDate, numberOfGuests, name, mobile,
            place: place._id,
            price: numberOfNights * place.price * numberOfGuests,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <div className='bg-white shadow p-4 rounded-2xl'>
                <div className='text-2xl text-center'>
                    Price: ₹{place.price} night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className='py-3 px-4'>
                            <label>Check In:</label>
                            <input type="date" value={checkInDate} min={today} onChange={handleCheckInChange} />
                        </div>
                        <div className='border-l py-3 px-4'>
                            <label>Check Out:</label>
                            <input type="date" value={checkOutDate} min={today} onChange={handleCheckOutChange} />
                        </div>
                    </div>
                    <div className='border-t py-3 px-4'>
                        <label>Guests:</label>
                        <input type="number" value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} />
                    </div>
                    {numberOfNights > 0 && (
                        <div className='border-t py-3 px-4'>
                            <label>Name:</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} />

                            <label>Mobile No:</label>
                            <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} />
                        </div>
                    )}
                </div>
                <button onClick={bookingHandler} className="primary mt-4">
                    Reserve
                    {numberOfNights > 0 && (
                        <span className='m-2'>₹{numberOfNights * place.price * numberOfGuests}</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ReservationForm;
