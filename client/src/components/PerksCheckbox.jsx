import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCar, faTv, faPaw, faPersonSwimming, faLaptop } from '@fortawesome/free-solid-svg-icons';


const PerksCheckbox = ({ selected, onChange }) => {
    return (
        <>
            <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
                <label className='border  p-4 flex  rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <FontAwesomeIcon icon={faWifi} />
                    <span>Wifi</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <FontAwesomeIcon icon={faTv} />
                    <span>TV</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <FontAwesomeIcon icon={faCar} />
                    <span>Free parking</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <FontAwesomeIcon icon={faLaptop} />
                    <span>Dedicated workspace</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <FontAwesomeIcon icon={faPaw} />
                    <span>Pets allowed</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <FontAwesomeIcon icon={faPersonSwimming} />
                    <span>Pool</span>
                </label>

            </div>
        </>
    )
}

export default PerksCheckbox