import React from "react";
import { getCookie } from '../utils/cookie';
import '../../public/assets/css/EditPlaylist.css';

class EditPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            description: props.description
        };
    }

    handleInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, description } = this.state;
        const userID = getCookie('userId');
        const { playlistID } = this.props;

        fetch(`/api/playlist/${playlistID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'user-id': userID
            },
            body: JSON.stringify({ name, description })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            console.log('Playlist updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating playlist:', error);
        });
    }

    render() {
        const { name, description } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="edit-playlist-form">
                <label htmlFor="name">Edit playlist name</label>
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={this.handleInputChange} 
                />
                <label htmlFor="description">Edit description</label>
                <input 
                    type="text" 
                    id="description" 
                    value={description} 
                    onChange={this.handleInputChange} 
                />
                <button type="submit">Edit Playlist</button>
            </form>
        );
    }
}

export default EditPlaylist;