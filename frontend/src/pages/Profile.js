import React from 'react';
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
=======
import { useParams} from 'react-router-dom';
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
import Header from "../components/Header.js";
import ProfileComponent from '../components/ProfileComponent.js';
import Followers from '../components/Followers.js';
import Following from '../components/Following.js';
import EditProfile from '../components/EditProfile.js';
<<<<<<< HEAD
import { getCookie, deleteCookie } from '../utils/cookie';
import '../../public/assets/css/Profile.css';
=======
import CreatePlaylist from '../components/CreatePlaylist.js';
import { getCookie, deleteCookie } from '../utils/cookie';
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            playlists: [],
            followers: [],
            following: [],
<<<<<<< HEAD
            friendRequests: [],
            loggedInUserId: null,
            isFriend: false,
            friendRequestSent: false,
=======
            loggedInUserId: null,
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
        };
    }

    async componentDidMount() {
        const { id } = this.props.params;
        const loggedInUserId = getCookie('userId');
        this.setState({ loggedInUserId });
        await this.fetchUser(id);
        await this.fetchPlaylists(id);
        await this.fetchFollowers(id);
        await this.fetchFollowing(id);
<<<<<<< HEAD
        await this.fetchFriendRequests(loggedInUserId);
=======
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
    }

    fetchUser = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ user: data });
        } catch (error) {
<<<<<<< HEAD
            console.log("Error fetching user:", error);
=======
            console.log("Error fetching user data:", error);
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
        }
    };

    fetchPlaylists = async (id) => {
        try {
            const response = await fetch(`/api/playlists/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ playlists: data });
        } catch (error) {
            console.log("Error fetching playlists:", error);
        }
    };

    fetchFollowers = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}/followers`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ followers: data });
        } catch (error) {
            console.log("Error fetching followers:", error);
        }
    };

    fetchFollowing = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}/following`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ following: data });
        } catch (error) {
            console.log("Error fetching following:", error);
        }
    };

<<<<<<< HEAD
    fetchFriendRequests = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}/friend-requests`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ friendRequests: data });
        } catch (error) {
            console.log("Error fetching friend requests:", error);
        }
    };

    handleSendFriendRequest = async () => {
        const { user, loggedInUserId } = this.state;
        try {
            const response = await fetch('/api/friend-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: loggedInUserId, friendId: user._id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            this.setState({ friendRequestSent: true });
        } catch (error) {
            console.log("Error sending friend request:", error);
        }
    };

    handleAcceptFriendRequest = async (friendId) => {
        const { loggedInUserId } = this.state;
        try {
            const response = await fetch('/api/accept-friend-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: loggedInUserId, friendId }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            this.setState(prevState => ({
                isFriend: true,
                friendRequests: prevState.friendRequests.filter(request => request._id !== friendId)
            }));
        } catch (error) {
            console.log("Error accepting friend request:", error);
        }
    };

    handleRejectFriendRequest = async (friendId) => {
        const { loggedInUserId } = this.state;
        try {
            await fetch('/api/reject-friend-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: loggedInUserId, friendId }),
            });

            this.setState(prevState => ({
                friendRequests: prevState.friendRequests.filter(request => request._id !== friendId)
            }));
        } catch (error) {
            console.log("Error rejecting friend request:", error);
        }
    };

    handleUnfriend = async () => {
        const { user, loggedInUserId } = this.state;
        try {
            const response = await fetch('/api/unfriend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: loggedInUserId, friendId: user._id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            this.setState({ isFriend: false });
        } catch (error) {
            console.log("Error unfriending user:", error);
        }
    };

=======
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
    handleDeleteAccount = async () => {
        const { user, loggedInUserId } = this.state;
        if (user._id !== loggedInUserId) {
            return;
        }

        try {
            const response = await fetch(`/api/user/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': loggedInUserId,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            deleteCookie('userId');
            window.location.href = '/'; 
        } catch (error) {
            console.log("Error deleting account:", error);
        }
    };

    render() {
<<<<<<< HEAD
        const { user, playlists, followers, following, friendRequests, loggedInUserId, isFriend, friendRequestSent } = this.state;
=======
        const { user, playlists, followers, following, loggedInUserId } = this.state;
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

        if (!user) {
            return <div>Loading...</div>;
        }

        const isOwnProfile = user._id === loggedInUserId;

        return (
<<<<<<< HEAD
            <div className="profile-container">
=======
            <div>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                <header className="top-0 w-full p-4 flex justify-center z-10">
                    <h1 className="text-8xl">Allegro</h1>
                </header>
                <Header />
<<<<<<< HEAD

                {/* Display name and profile picture only if not friends */}
                {!isFriend && !isOwnProfile && (
                    <ProfileComponent 
                        userId={user._id}
                        username={user.username} 
                        imageUrl={user.imageUrl} 
                    />
                )}

                {/* Display full profile if friends */}
                {isFriend && (
                    <div>
                        <ProfileComponent 
                            userId={user._id}
                            username={user.username} 
                            description={user.description} 
                            imageUrl={user.imageUrl} 
                            playlists={playlists} 
                        />
                        <Followers userId={user._id} />
                        <Following userId={user._id} />
                    </div>
                )}

                {/* Display full profile if own profile */}
                {isOwnProfile && (
                    <div>
                        <ProfileComponent 
                            userId={user._id}
                            username={user.username} 
                            description={user.description} 
                            imageUrl={user.imageUrl} 
                            playlists={playlists} 
                        />
                        <Followers userId={user._id} />
                        <Following userId={user._id} />
                        <EditProfile username={user.username} description={user.description} />
                    </div>
                )}

                {/* Display friend request button if not own profile and not friends */}
                {!isOwnProfile && !isFriend && !friendRequestSent && (
                    <button onClick={this.handleSendFriendRequest}>Send Friend Request</button>
                )}

                {/* Display unfriend button if friends */}
                {!isOwnProfile && isFriend && (
                    <button onClick={this.handleUnfriend}>Unfriend</button>
                )}

                {/* Display friend requests if own profile */}
                {isOwnProfile && friendRequests.length > 0 && (
                    <div className="friend-requests">
                        <h2>Friend Requests</h2>
                        <ul>
                            {friendRequests.map(request => (
                                <li key={request._id}>
                                    <span>{request.username}</span>
                                    <button onClick={() => this.handleAcceptFriendRequest(request._id)}>Accept</button>
                                    <button onClick={() => this.handleRejectFriendRequest(request._id)}>Reject</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
=======
                <ProfileComponent 
                    userId={user._id}
                    username={user.username} 
                    description={user.description} 
                    imageUrl={user.imageUrl} 
                    playlists={playlists} 
                />
                <Followers userId={user._id} />
                <Following userId={user._id} />
                {isOwnProfile && <EditProfile username={user.username} description={user.description} />}
                {isOwnProfile && <CreatePlaylist />}
                {isOwnProfile && <button onClick={this.handleDeleteAccount}>Delete account</button>}
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
            </div>
        );
    }
}

const ProfileWithParams = (props) => {
    return <Profile {...props} params={useParams()} />;
};

export default ProfileWithParams;