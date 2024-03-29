import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { setUser } = useContext(UserContext);

    // const loginSubmitHandler = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const { data } = await axios.post('/login', {
    //             email,
    //             password
    //         });
    //         setUser(data.userDoc);

    //         setUser(data.userDoc);
    //         alert("login success");
    //         setRedirect(true)
    //         console.log("response", data.userDoc)


    //     } catch (error) {
    //         alert('Login Failed: User not found');
    //     }
    // }

    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            setUser(data);
            alert('Login success');
            setRedirect(true);
        } catch (error) {
            alert('Login failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }



    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64' >
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto ' onSubmit={loginSubmitHandler}>
                    <input type='email'
                        placeholder='your@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password"
                        placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't have an account yet?
                        <Link className='underline text-black ' to={'/register'} style={{ marginLeft: '5px' }}>
                            Register Now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage