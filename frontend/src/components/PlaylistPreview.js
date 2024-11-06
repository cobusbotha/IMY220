import React from "react";
import { Link } from "react-router-dom";
import { getCookie } from '../utils/cookie';
<<<<<<< HEAD
import '../../public/assets/css/PlaylistPreview.css';
=======
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

class PlaylistPreview extends React.Component {
    state = {
        userIDs: [],
        isLoading: true,
<<<<<<< HEAD
        error: null,
=======
        error: null
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
    };

    componentDidMount() {
        this.fetchPlaylistData();
    }

    fetchPlaylistData = async () => {
        const { id } = this.props;
<<<<<<< HEAD
        try {
            const response = await fetch(`/api/playlist/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            this.setState({ userIDs: data.userIDs, isLoading: false });
        } catch (error) {
=======

        try {
            const response = await fetch(`/api/playlist/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ userIDs: data.userIDs, isLoading: false });
        } catch (error) {
            console.log("Error fetching playlists:", error);
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
            this.setState({ error: error.message, isLoading: false });
        }
    };

    handleDelete = async () => {
        const { id, onDelete } = this.props;
        const userId = getCookie('userId');

        try {
<<<<<<< HEAD
            const response = await fetch(`/api/playlists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': userId,
                },
            });

            if (response.ok) {
                console.log("Playlist deleted successfully");
                if (onDelete) onDelete(id);
            } else {
                const errorData = await response.json();
                console.error('Failed to delete playlist:', errorData.message);
=======
            const response = await fetch(`/api/playlists/${id}/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': userId
                }
            });

            if (response.ok) {
                if (onDelete) {
                    onDelete(id);
                }
            } else {
                const errorData = await response.json();
                console.error('Failed to remove playlist from user library:', errorData.message);
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render() {
        const { id, name, imageUrl, description } = this.props;
        const { userIDs, isLoading, error } = this.state;
        const userId = getCookie('userId');
<<<<<<< HEAD
        const isCreator = userIDs.includes(userId);

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

        return (
            <div className="playlist-preview">
                <Link to={`/playlist/${id}`}>
                    <img src={imageUrl} alt="Playlist" />
=======
        const isUserInPlaylist = Array.isArray(userIDs) && userIDs.includes(userId);

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div>
                <style>
                    {`
                        a:visited {
                            color: inherit;
                        }
                    `}
                </style>
                <Link to={`/playlist/${id}`}>
                    <img src={imageUrl} alt="Placeholder" style={{ width: '100px' }} />
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                </Link>
                <Link to={`/playlist/${id}`} style={{ textDecoration: 'none' }}>
                    <h3>{name}</h3>
                </Link>
                <p>{description}</p>
<<<<<<< HEAD

                {isCreator && (
                    <button onClick={this.handleDelete}>Delete Playlist</button>
                )}
=======
                {isUserInPlaylist && <button onClick={this.handleDelete}>Remove from library</button>}
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
            </div>
        );
    }
}

export default PlaylistPreview;