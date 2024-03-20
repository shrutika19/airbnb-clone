import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AccountPage = () => {
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

    const linkClasess = (type = null) => {
        let classes = 'py-2 px-6';
        if (type === subpage) {
            classes += ' bg-primary rounded-full text-white';
        }
        return classes;
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <>
            <nav className='w-full mt-8 flex justify-center gap-2 mb-8'>
                <Link className={linkClasess('profile')} to={'/account'} > My Profile</Link>
                <Link className={linkClasess('bookings')} to={'/account/bookings'} > My Bookings</Link>
                <Link className={linkClasess('places')} to={'/account/places'} > My Accommodation</Link>
            </nav>
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logoutHandler} className='primary max-w-md mt-2'>Logout</button>
                </div>
            )}
        </>
    )
}

export default AccountPage