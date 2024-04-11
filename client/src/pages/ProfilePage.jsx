import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AccommodationPage from './AccommodationPage';
import AccountNav from '../components/AccountNav';

const ProfilePage = () => {
    const { user, loading, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    let { subpage } = useParams();

    if (subpage === undefined) {
        subpage = 'profile';
    }

    const logoutHandler = async () => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!loading) {
        return '...loading';
    }

    if (loading && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    const getInitials = (name) => {
        const parts = name.split(' ');
        return parts[0].charAt(0).toUpperCase();
    };

    return (
        <>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="flex gap-6">
                    <div className="w-1/4 bg-white-100 shadow-xl p-4 rounded-2xl flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center h-24 w-24 rounded-full bg-black text-white text-3xl font-bold shadow-md">
                            {user.name && <span>{getInitials(user.name)}</span>}
                        </div>
                        <div className='m-3 text-2xl font-bold'>{user.name}</div>
                    </div>
                    <div className="flex-grow p-4">
                        <h1 className="text-2xl font-bold mb-2">Your Profile</h1>
                        <p className="text-gray-500 mb-2">
                            The information you share will be used across Airbnb to help
                            other guests and Hosts get to know you.
                        </p>
                        <hr className='m-4' />
                        {/* Add content for additional profile information here */}
                        <h3 className='text-xl font-semibold mb-4'>{user.name.split(' ')[0]}'s confirmed information</h3>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <span className="ml-2">Email address</span>
                        </div>
                        <hr className='m-4' />
                        {/* <div>Logged in as {user.name} ({user.email})</div>
                        <hr className='m-4' /> */}
                        <button onClick={logoutHandler} className="primary max-w-md mt-5">
                            Logout
                        </button>
                    </div>
                </div>

            )}
            {
                subpage === 'places' && (
                    <AccommodationPage />
                )
            }
        </>
    )
}

export default ProfilePage;