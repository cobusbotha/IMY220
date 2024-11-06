<<<<<<< HEAD
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
=======
import React from "react";
import { getCookie, deleteCookie } from '../utils/cookie';

class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const id = getCookie('userId');
        try {
            const response = await fetch(`/api/${id}/createplaylist`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    description: this.state.description
                })
            });
            if (response.ok) {
                console.log('Playlist created successfully');
            } else {
                console.log('Creation failed');
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
            }
        } catch (error) {
            console.error('Error:', error);
        }
<<<<<<< HEAD
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
=======
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Insert playlist name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Playlist name here..."
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <br/>
                <label htmlFor="description">Insert description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Playlist description here..."
                    value={this.state.description}
                    onChange={this.handleChange}
                />
                <br/>
                <button type="submit">Create Playlist</button>
            </form>
        );
    }
}
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

export default CreatePlaylist;