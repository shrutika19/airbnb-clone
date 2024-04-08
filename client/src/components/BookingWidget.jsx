import React, { useState } from 'react';

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
                        <input type="number" placeholder='4' />
                    </div>
                </div>
                <button className="primary mt-4">Reserve</button>
            </div>
        </div>
    );
};

export default ReservationForm;
