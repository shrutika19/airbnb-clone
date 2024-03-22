import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCar, faTv, faPaw, faPersonSwimming, faLaptop } from '@fortawesome/free-solid-svg-icons';


const PerksCheckbox = ({ selected, onChange }) => {
    const handleCheckBoxClick = (e) => {
        const { checked, name } = e.target;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }
    return (
        <>
            <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
                <label className='border  p-4 flex  rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" checked={selected.includes('wifi')} name='wifi' onChange={handleCheckBoxClick} />
                    <FontAwesomeIcon icon={faWifi} />
                    <span>Wifi</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" checked={selected.includes('tv')} name='tv' onChange={handleCheckBoxClick} />
                    <FontAwesomeIcon icon={faTv} />
                    <span>TV</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" checked={selected.includes('parking')} name='parking' onChange={handleCheckBoxClick} />
                    <FontAwesomeIcon icon={faCar} />
                    <span>Free parking</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" checked={selected.includes('workspace')} name='workspace' onChange={handleCheckBoxClick} />
                    <FontAwesomeIcon icon={faLaptop} />
                    <span>Dedicated workspace</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" checked={selected.includes('pets')} name='pets' onChange={handleCheckBoxClick} />
                    <FontAwesomeIcon icon={faPaw} />
                    <span>Pets allowed</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" checked={selected.includes('pool')} name='pool' onChange={handleCheckBoxClick} />
                    <FontAwesomeIcon icon={faPersonSwimming} />
                    <span>Pool</span>
                </label>

            </div>
        </>
    )
}

export default PerksCheckbox