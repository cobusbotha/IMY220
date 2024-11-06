import React from "react";
import Song from "./Song";
import '../../public/assets/css/SongFeed.css';

class SongFeed extends React.Component {
    render() {
        const { songs } = this.props;

        return (
            <div className="song-feed">
                <h2>Song Feed</h2>
                {songs.map((song, index) => (
                    <div key={index} className="song-item">
                        <Song 
                            title={song.title} 
                            link={song.link} 
                        />
                    </div>
                ))}
            </div>
        );
    }
};

export default SongFeed;