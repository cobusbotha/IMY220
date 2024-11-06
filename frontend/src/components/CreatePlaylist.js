import React, { useState } from 'react';
import { getCookie } from '../utils/cookie';
import '../../public/assets/css/CreatePlaylist.css';

const CreatePlaylist = ({ onCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleNameChange = (e) => setName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }
    
        try {
            const response = await fetch('/api/createplaylist', {
                method: 'POST',
                headers: {
                    'user-id': getCookie('userId'),
                },
                body: formData,
            });
    
            if (response.ok) {
                onCreate();
                setName('');
                setDescription('');
                setImage(null);
                setPreview(null);
            } else {
                console.error('Failed to create playlist');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };    

    return (
        <form onSubmit={handleSubmit} className="create-playlist-form">
            <div>
                <label>Playlist Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                />
            </div>
            <div>
                <label>Upload Playlist Picture:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="playlist-image-preview"
                    />
                )}
            </div>
            <button type="submit">Create Playlist</button>
        </form>
    );
};

export default CreatePlaylist;