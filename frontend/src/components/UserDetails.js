import React, { useEffect, useState } from 'react';
import { getCookie } from '../utils/cookie';


const UserDetails = ({ userId }) => {
    const [userDetails, setUserDetails] = useState(null);
    const loggedInUserId = getCookie('userId');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`/api/users/${userId}/details`, {
                    headers: {
                        'user-id': loggedInUserId,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUserDetails(data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetails();
    }, [userId]);

    if (!userDetails) return <p>Loading...</p>;

    return (
        <div>
            <h2>Description</h2>
            <p>{userDetails.description}</p>

            <h2>Friends</h2>
            <ul>
                {userDetails.friends.map(friend => (
                    <li key={friend._id}>{friend.username}</li>
                ))}
            </ul>

            <h2>Playlists</h2>
            <ul>
                {userDetails.playlists.map(playlist => (
                    <li key={playlist.playlistID}>
                        {playlist.name} - {playlist.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDetails;