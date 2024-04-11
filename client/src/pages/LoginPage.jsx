import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { validateLogin } from '../validation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const { setUser } = useContext(UserContext);

    const loginSubmitHandler = async (e) => {
        e.preventDefault();

        // Validation
        const errors = validateLogin(email, password);
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

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
                    <input
                        type='email'
                        placeholder='your@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={validationErrors.email ? 'border-red-500' : ''}
                    />
                    {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={validationErrors.password ? 'border-red-500' : ''}
                    />
                    {validationErrors.password && <p className="text-red-500">{validationErrors.password}</p>}
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

export default LoginPage;
