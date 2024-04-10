import React from 'react'

const AccommodationImages = ({ place, index = 0, className = null }) => {
    if (!place.addedPhotos?.length) {
        return ''
    }
    if (!className) {
        className = 'object-cover';
    }
    return (
        <img className={className} src={'http://localhost:3000/uploads/' + place.addedPhotos[index]} alt='' />)
}

export default AccommodationImages;


