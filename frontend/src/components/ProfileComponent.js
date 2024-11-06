import React from "react";
import PlaylistPreview from "./PlaylistPreview";
import { getCookie } from '../utils/cookie';
<<<<<<< HEAD
import '../../public/assets/css/ProfileComponent.css';
=======
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

class ProfileComponent extends React.Component {
    state = {
        playlists: []
    };

    componentDidMount() {
        this.fetchPlaylists();
    }

    fetchPlaylists = () => {
        const { userId } = this.props;
        const loggedInUserId = getCookie('userId');
<<<<<<< HEAD
=======

        // Determine if viewing own profile or another user's profile
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
        const fetchUrl = userId === loggedInUserId
            ? `/api/playlists/${loggedInUserId}`
            : `/api/playlists/${userId}/playlists`;

        fetch(fetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ playlists: data });
            })
            .catch(error => {
                console.error('Error fetching playlists:', error);
            });
    }

    render() {
        const { imageUrl, username, description } = this.props;
        const { playlists } = this.state;

        return (
<<<<<<< HEAD
            <div className="profile-component">
                <img
                    src={imageUrl || '/assets/images/profile.webp'}
                    alt={`${username}'s profile`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/images/profile.webp';
                    }}
                />
                <h2>{username}</h2>
                {description && <p>{description}</p>}
=======
            <div>
                <img src={imageUrl} alt="Placeholder" style={{ width: '200px' }} />
                <h2>{username}</h2>
                <p>{description}</p>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                
                <hr/>

                <h2>Playlists</h2>
                {playlists.map((playlist, index) => (
<<<<<<< HEAD
                    <div key={index} className="playlist-preview-container">
=======
                    <div key={index}>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                        <PlaylistPreview 
                            id={playlist.playlistID} 
                            name={playlist.name} 
                            description={playlist.description} 
                            imageUrl={playlist.imageUrl} 
                        />
                    </div>
                ))}
            </div>
        );
    }
}

<<<<<<< HEAD
export default ProfileComponent;
=======
export default ProfileComponent;
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
