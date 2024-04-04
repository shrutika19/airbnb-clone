import React, { useState } from 'react'

const TimeDetails = ({ checkIn, setCheckIn, checkOut, setCheckOut, maxGuests, setMaxGuests, price, setPrice }) => {

    return (
        <>
            <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
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
                <div>
                    <h3 className='mt-2 -mb-1'>Price per Night</h3>
                    <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
            </div>
        </>
    )
}

export default TimeDetails