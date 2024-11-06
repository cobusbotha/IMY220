import React from "react";
import { getCookie } from '../utils/cookie';
import '../../public/assets/css/EditProfile.css';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            description: props.description,
            image: null,
            imageUrl: props.imageUrl
        };
    }

    handleInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    handleImageChange = (event) => {
        this.setState({ image: event.target.files[0] });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, description, image } = this.state;
        const userID = getCookie('userId');

        const formData = new FormData();
        formData.append('username', username);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        fetch(`/api/users/${userID}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            console.log('Profile updated successfully:', data);
            this.setState({ imageUrl: data.imageUrl }); 
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });
    }

    render() {
        const { username, description, imageUrl } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="edit-profile-form">
                <label htmlFor="username">Edit name here</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={this.handleInputChange} 
                />
                <label htmlFor="description">Edit description here</label>
                <input 
                    type="text" 
                    id="description" 
                    value={description} 
                    onChange={this.handleInputChange} 
                />
                <label htmlFor="image">Change profile picture</label>
                <input 
                    type="file" 
                    id="image" 
                    accept="image/*"
                    onChange={this.handleImageChange} 
                />
                <button type="submit">Submit Changes</button>
            </form>
        );
    }
}

export default EditProfile;
