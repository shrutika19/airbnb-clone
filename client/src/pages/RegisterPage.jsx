import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { validateRegister } from '../validation';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const registerSubmitHandler = async (e) => {
        e.preventDefault();

        // Validation
        const errors = validateRegister(name, email, password);
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            await axios.post('/register', {
                name,
                email,
                password
            });

            alert('Registration successful. Now you can log in.');
        } catch (error) {
            alert('User already exists. Please Login');
        }

    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64' >
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto ' onSubmit={registerSubmitHandler}>
                    <input
                        type='text'
                        placeholder='Your Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={validationErrors.name ? 'border-red-500' : ''}
                    />
                    {validationErrors.name && <p className="text-red-500">{validationErrors.name}</p>}
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
                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already a member?
                        <Link className='underline text-black ' to={'/login'} style={{ marginLeft: '5px' }}>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;
