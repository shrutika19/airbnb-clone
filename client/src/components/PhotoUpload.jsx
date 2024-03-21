import axios from 'axios';
import React, { useState } from 'react'

const PhotoUpload = () => {
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');

    const addPhotoByLink = async (e) => {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        setAddedPhotos(prev => {
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
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            })
        })
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
                        <div className='h-32 flex' key={index}>
                            <img className='rounded-2xl w-full object-cover' src={'http://localhost:3000/uploads/' + link} />
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