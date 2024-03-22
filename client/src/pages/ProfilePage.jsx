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

    return (
        <>
            <AccountNav />
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logoutHandler} className='primary max-w-md mt-2'>Logout</button>
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