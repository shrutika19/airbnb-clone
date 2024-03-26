import axios from 'axios';
import React, { useState } from 'react'

const PhotoUpload = ({ addedPhotos, onChange }) => {
    //const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');

    const addPhotoByLink = async (e) => {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        onChange(prev => {
            return [...prev, filename]
        });
        setPhotoLink('');
    }

    const uploadImage = (e) => {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            onChange(prev => {
                return [...prev, ...filenames];
            })
        })
    }

    const removePhoto = (imageUrl) => {
        onChange([...addedPhotos.filter(image => image !== imageUrl)])
    }

    return (
        <div>
            <div className='flex gap-2'>
                <input
                    type="text"
                    placeholder='upload photos using link..'
                    value={photoLink}
                    onChange={e => setPhotoLink(e.target.value)}
                />
                <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-full'>Upload&nbsp;Photo</button>
            </div>
            <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {
                    addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                        <div className='h-32 flex relative' key={index}>
                            <img className='rounded-2xl w-full object-cover' src={'http://localhost:3000/uploads/' + link} />
                            <button onClick={() => removePhoto(link)} className='absolute bottom-1 right-1 text-white p-1 bg-black bg-opacity-50 rounded-full' title='Delete image'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                            </button>
                        </div>
                    ))
                }
                <label className='h-32 cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-xl text-gray-600'>
                    <input type='file' multiple className='hidden ' onChange={uploadImage} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    Upload
                </label>
            </div>
        </div>
    )
}

export default PhotoUpload 