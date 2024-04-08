import React from 'react'

const BookingWidget = ({ place }) => {
    return (
        <div>
            <div className='bg-white shadow p-4 rounded-2xl'>
                <div className='text-2xl text-center'>
                    Price: ₹{place.price} night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className=' py-3 px-4 '>
                            <label>Check In:</label>
                            <input type="date" />
                        </div>
                        <div className=' border-l py-3 px-4'>
                            <label>Check Out:</label>
                            <input type="date" />
                        </div>
                    </div>
                    <div className=' border-t py-3 px-4'>
                        <label>Guests:</label>
                        <input type="number" value={1} />
                    </div>
                </div>
                <button className="primary mt-4">Reserve</button>
            </div>
        </div>
    )
}

export default BookingWidget