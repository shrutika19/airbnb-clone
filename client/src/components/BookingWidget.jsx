import React, { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from "date-fns";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { validateGuests, validateName, validateMobile } from '../validation';


const BookingWidget = ({ place }) => {
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
    const [guestsError, setGuestsError] = useState('');
    const [nameError, setNameError] = useState('');
    const [mobileError, setMobileError] = useState('');

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

    const initPayment = async (data) => {
        const { data: { key } } = await axios.get("http://localhost:3000/api/getkey")
        const options = {
            key: key,
            amount: data.amount,
            currency: data.currency,
            name: place.name,
            description: "Test Transaction",
            image: "https://avatars.githubusercontent.com/u/96648429?s=96&v=4",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyUrl = "http://localhost:3000/verify";
                    const { data } = await axios.post(verifyUrl, response);
                    console.log(data);
                    if (data.message === "Payment verified successfully") {
                        // Payment is successful, redirect to the booking page
                        const response = await axios.post('/bookings', {
                            checkInDate, checkOutDate, numberOfGuests, name, mobile,
                            place: place._id,
                            price: numberOfNights * place.price * numberOfGuests,
                        });
                        const bookingId = response.data._id;
                        setRedirect(`/account/bookings/${bookingId}`);
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            theme: {
                color: "#F5385D",
            },
        };
        const rzp1 = new window.Razorpay(options);
        console.log(rzp1)
        rzp1.open();
    }

    const bookingHandler = async () => {
        // Reset previous errors

        setGuestsError('');
        setNameError('');
        setMobileError('');

        // Validate input fields
        let isValid = true;

        if (!validateGuests(numberOfGuests)) {
            setGuestsError('Please enter a valid number of guests.');
            isValid = false;
        }
        if (!validateName(name)) {
            setNameError('Please enter a valid name.');
            isValid = false;
        }
        if (!validateMobile(mobile)) {
            setMobileError('Please enter a valid mobile number.');
            isValid = false;
        }

        // If validation fails, return without making the booking request
        if (!isValid) {
            return;
        }

        const totalPrice = numberOfNights * place.price * numberOfGuests
        try {
            const checkOutUrl = "http://localhost:3000/checkout";
            const { data } = await axios.post(checkOutUrl, { amount: totalPrice });
            console.log(data);
            initPayment(data.data)
        } catch (error) {
            console.log(error)

        }

        // const response = await axios.post('/bookings', {
        //     checkInDate, checkOutDate, numberOfGuests, name, mobile,
        //     place: place._id,
        //     price: numberOfNights * place.price * numberOfGuests,
        // });
        // const bookingId = response.data._id;
        // setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    const errorStyle = {
        color: 'red',
        fontSize: '12px',
        marginTop: '4px',
        fontStyle: 'italic',
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
                        <input type="number" value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} />
                        {guestsError && <div style={errorStyle}>{guestsError}</div>}
                    </div>
                    {numberOfNights > 0 && (
                        <div className='border-t py-3 px-4'>
                            <label>Name:</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} />
                            {nameError && <div style={errorStyle}>{nameError}</div>}

                            <label>Mobile No:</label>
                            <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} />
                            {mobileError && <div style={errorStyle}>{mobileError}</div>}
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

export default BookingWidget;
