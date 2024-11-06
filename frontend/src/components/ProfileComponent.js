import React from "react";
import PlaylistPreview from "./PlaylistPreview";
import { getCookie } from '../utils/cookie';
import '../../public/assets/css/ProfileComponent.css';

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
                
                <hr/>

                <h2>Playlists</h2>
                {playlists.map((playlist, index) => (
                    <div key={index} className="playlist-preview-container">
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

export default ProfileComponent;
