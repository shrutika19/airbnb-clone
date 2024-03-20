import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';

const AccountPage = () => {
    const { user, loading } = useContext(UserContext);

    if (!loading) {
        return '...loading';
    }

    if (loading && !user) {
        return <Navigate to={'/login'} />
    }

    const { subpage } = useParams();



    return (
        <>
            <nav className='w-full mt-8 flex justify-center gap-2'>
                <Link className='py-2 px-6 bg-primary rounded-full text-white' to={'/account'} > My Profile</Link>
                <Link className='py-2 px-6' to={'/account/bookings'} > My Bookings</Link>
                <Link className='py-2 px-6' to={'/account/places'} > My Accommodation</Link>
            </nav>
        </>
    )
}

export default AccountPage