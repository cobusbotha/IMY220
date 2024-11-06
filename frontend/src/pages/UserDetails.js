import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfilePreview from '../components/ProfilePreview';
import PlaylistPreview from '../components/PlaylistPreview';
import { getCookie } from '../utils/cookie';
import '../../public/assets/css/UserDetails.css';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [savedPlaylists, setSavedPlaylists] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userResponse = await fetch(`/api/users/${id}`);
                const userData = await userResponse.json();
                setUser(userData);

                const friendsResponse = await fetch(`/api/users/${id}/following`);
                const friendsData = await friendsResponse.json();
                setFriends(friendsData);

                const playlistsResponse = await fetch(`/api/playlists/${id}`);
                const playlistsData = await playlistsResponse.json();
                setPlaylists(playlistsData);

                const loggedInUserId = getCookie('userId');
                const savedPlaylistsResponse = await fetch(`/api/user/${loggedInUserId}/playlists`);
                const savedPlaylistsData = await savedPlaylistsResponse.json();
                setSavedPlaylists(savedPlaylistsData.map(playlist => playlist.playlistID));
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [id]);

    const handleSavePlaylist = async (playlistId) => {
        const loggedInUserId = getCookie('userId');

        try {
            const response = await fetch(`/api/user/${loggedInUserId}/save-playlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playlistId }),
            });

            if (response.ok) {
                setSavedPlaylists(prevSaved => [...prevSaved, playlistId]);
            } else {
                const data = await response.json();
                console.log(data.message || 'Error saving playlist');
            }
        } catch (error) {
            console.error('Error saving playlist:', error);
        }
    };

    return (
        <div className="user-details-container">
            <button onClick={() => navigate('/home')} className="back-button">
                Go Back Home
            </button>

            {user ? (
                <div>
                    <h2>{user.username}'s Profile</h2>
                    <ProfilePreview image={user.imageUrl} username={user.username} />
                    <p>{user.description}</p>

                    <h3>Friends</h3>
                    {friends.length > 0 ? (
                        <ul className="grid">
                            {friends.map(friend => (
                                <li key={friend._id}>
                                    <ProfilePreview image={friend.imageUrl} username={friend.username} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>This user has no friends to display.</p>
                    )}

                    <h3>Playlists</h3>
                    {playlists.length > 0 ? (
                        <ul className="grid">
                            {playlists.map(playlist => (
                                <li key={playlist.playlistID} className="relative">
                                    <PlaylistPreview
                                        id={playlist.playlistID}
                                        name={playlist.name}
                                        imageUrl={playlist.imageUrl}
                                        description={playlist.description}
                                    />
                                    {!savedPlaylists.includes(playlist.playlistID) && (
                                        <button
                                            onClick={() => handleSavePlaylist(playlist.playlistID)}
                                            className="save-button"
                                        >
                                            Save Playlist
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>This user has no playlists to display.</p>
                    )}
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default UserDetails;