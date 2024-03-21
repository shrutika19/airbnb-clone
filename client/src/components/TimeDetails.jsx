import React, { useState } from 'react'

const TimeDetails = () => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    return (
        <>
            <div className='grid gap-2 sm:grid-cols-3'>
                <div>
                    <h3 className='mt-2 -mb-1'>Check in time</h3>
                    <input
                        type="text"
                        placeholder='12:00'
                        value={checkIn}
                        onChange={e => setCheckIn(e.target.value)}
                    />
                </div>
                <div>
                    <h3 className='mt-2 -mb-1'>Check out time</h3>
                    <input
                        type="text"
                        placeholder='22:00'
                        value={checkOut}
                        onChange={e => setCheckOut(e.target.value)}
                    />
                </div>
                <div>
                    <h3 className='mt-2 -mb-1'>Maximum guests</h3>
                    <input
                        type="number"
                        placeholder='4'
                        value={maxGuests}
                        onChange={e => setMaxGuests(e.target.value)}
                    />
                </div>
            </div>
        </>
    )
}

export default TimeDetails