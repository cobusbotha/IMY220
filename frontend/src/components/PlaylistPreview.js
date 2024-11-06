import React from "react";
import { Link } from "react-router-dom";
import { getCookie } from '../utils/cookie';
import '../../public/assets/css/PlaylistPreview.css';

class PlaylistPreview extends React.Component {
    state = {
        userIDs: [],
        isLoading: true,
        error: null,
    };

    componentDidMount() {
        this.fetchPlaylistData();
    }

    fetchPlaylistData = async () => {
        const { id } = this.props;
        try {
            const response = await fetch(`/api/playlist/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            this.setState({ userIDs: data.userIDs, isLoading: false });
        } catch (error) {
            this.setState({ error: error.message, isLoading: false });
        }
    };

    handleDelete = async () => {
        const { id, onDelete } = this.props;
        const userId = getCookie('userId');

        try {
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
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render() {
        const { id, name, imageUrl, description } = this.props;
        const { userIDs, isLoading, error } = this.state;
        const userId = getCookie('userId');
        const isCreator = userIDs.includes(userId);

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

        return (
            <div className="playlist-preview">
                <Link to={`/playlist/${id}`}>
                    <img src={imageUrl} alt="Playlist" />
                </Link>
                <Link to={`/playlist/${id}`} style={{ textDecoration: 'none' }}>
                    <h3>{name}</h3>
                </Link>
                <p>{description}</p>

                {isCreator && (
                    <button onClick={this.handleDelete}>Delete Playlist</button>
                )}
            </div>
        );
    }
}

export default PlaylistPreview;