import React from "react";
import PlaylistPreview from "./PlaylistPreview";
<<<<<<< HEAD
import '../../public/assets/css/PlaylistFeed.css';

class PlaylistFeed extends React.Component {
    state = {
        playlists: this.props.playlists,
    };

    handleRemovePlaylist = (playlistID) => {
        this.setState((prevState) => ({
            playlists: prevState.playlists.filter((playlist) => playlist.playlistID !== playlistID)
        }));
    };

    render() {
        const { playlists } = this.state;

        return (
            <div className="playlist-feed">
                <h2>Playlist Feed</h2>

                {playlists.map((playlist, index) => (
                    <div key={index} className="playlist-item">
=======

class PlaylistFeed extends React.Component {
    render() {
        const { playlists } = this.props;

        return (
            <div>
                <h2>Playlist Feed</h2>

                {playlists.map((playlist, index) => (
                    <div key={index}>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                        <PlaylistPreview 
                            id={playlist.playlistID} 
                            name={playlist.name} 
                            description={playlist.description} 
                            imageUrl={playlist.imageUrl} 
<<<<<<< HEAD
                            onDelete={this.handleRemovePlaylist}
=======
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                        />
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
<<<<<<< HEAD
}
=======
};
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

export default PlaylistFeed;