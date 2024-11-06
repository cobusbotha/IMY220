import React from "react";
import { getCookie } from '../utils/cookie';
<<<<<<< HEAD
import '../../public/assets/css/EditProfile.css';
=======
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
<<<<<<< HEAD
            description: props.description,
            image: null,
            imageUrl: props.imageUrl
=======
            description: props.description
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
        };
    }

    handleInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

<<<<<<< HEAD
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
=======
    handleSubmit = (event) => {
        event.preventDefault();
        const { username, description } = this.state;
        const userID = getCookie('userId');

        fetch(`/api/users/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, description })
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            console.log('Profile updated successfully:', data);
<<<<<<< HEAD
            this.setState({ imageUrl: data.imageUrl }); 
=======
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });
    }

    render() {
<<<<<<< HEAD
        const { username, description, imageUrl } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="edit-profile-form">
=======
        const { username, description } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                <label htmlFor="username">Edit name here</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={this.handleInputChange} 
                />
<<<<<<< HEAD
=======
                <br/>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                <label htmlFor="description">Edit description here</label>
                <input 
                    type="text" 
                    id="description" 
                    value={description} 
                    onChange={this.handleInputChange} 
                />
<<<<<<< HEAD
                <label htmlFor="image">Change profile picture</label>
                <input 
                    type="file" 
                    id="image" 
                    accept="image/*"
                    onChange={this.handleImageChange} 
                />
=======
                <br/>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                <button type="submit">Submit Changes</button>
            </form>
        );
    }
}

<<<<<<< HEAD
export default EditProfile;
=======
export default EditProfile;
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
