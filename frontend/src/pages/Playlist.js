import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header.js";
import PlaylistComponent from '../components/PlaylistComponent.js';
import EditPlaylist from '../components/EditPlaylist.js';
import ListComments from '../components/ListComments.js';
import { getCookie } from '../utils/cookie';
import '../../public/assets/css/Playlist.css';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: null,
            songs: [],
            error: null,
            loggedInUserId: null,
            newComment: "",
        };
    }

    async componentDidMount() {
        const { id } = this.props.params;
        const loggedInUserId = getCookie('userId');
        this.setState({ loggedInUserId });
        await this.fetchPlaylist(id);
        await this.fetchSongs(id);
    }

    fetchPlaylist = async (id) => {
        try {
            const response = await fetch(`/api/playlist/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ playlist: data, error: null });
        } catch (error) {
            this.setState({ error: 'Playlist not found' });
            console.log("Error fetching playlist data:", error);
        }
    };    

    fetchSongs = async (id) => {
        try {
            const response = await fetch(`/api/playlist/${id}/songs`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ songs: data });
        } catch (error) {
            console.log("Error fetching songs data:", error);
        }
    };

    handleCommentChange = (e) => {
        this.setState({ newComment: e.target.value });
    };

    handleCommentSubmit = async () => {
        const { playlist, newComment, loggedInUserId } = this.state;

        try {
            const response = await fetch(`/api/playlist/${playlist.playlistID}/comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: loggedInUserId, comment: newComment }),
            });

            if (response.ok) {
                const updatedComment = { author: loggedInUserId, comment: newComment, date: new Date() };
                this.setState((prevState) => ({
                    playlist: { ...prevState.playlist, comments: [...prevState.playlist.comments, updatedComment] },
                    newComment: ""
                }));
            } else {
                console.error("Failed to add comment");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    render() {
        const { playlist, songs, error, loggedInUserId, newComment } = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        if (!playlist) {
            return <div>Loading...</div>;
        }

        const isOwner = playlist.userIDs.includes(loggedInUserId);
        const hasSavedPlaylist = playlist.savedUserIDs && playlist.savedUserIDs.includes(loggedInUserId);


        return (
            <div>
                <Header />
                <div className="playlist-container">
                    <PlaylistComponent 
                        name={playlist.name} 
                        description={playlist.description} 
                        imageUrl={playlist.imageUrl} 
                        songs={songs} 
                    />
                    {isOwner && (
                        <EditPlaylist 
                            playlistID={playlist.playlistID} 
                            name={playlist.name} 
                            description={playlist.description} 
                        />
                    )}
                    <ListComments comments={playlist.comments} />
                    
                    {(isOwner || hasSavedPlaylist) && (
                        <div className="comment-section">
                            <input
                                type="text"
                                value={newComment}
                                onChange={this.handleCommentChange}
                                placeholder="Add a comment..."
                            />
                            <button onClick={this.handleCommentSubmit}>Submit</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const PlaylistWithParams = (props) => {
    return <Playlist {...props} params={useParams()} />;
};

export default PlaylistWithParams;