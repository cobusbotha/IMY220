import React from "react";
import PlaylistPreview from "./PlaylistPreview";
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
                        <PlaylistPreview 
                            id={playlist.playlistID} 
                            name={playlist.name} 
                            description={playlist.description} 
                            imageUrl={playlist.imageUrl} 
                            onDelete={this.handleRemovePlaylist}
                        />
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
}

export default PlaylistFeed;