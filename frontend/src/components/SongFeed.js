import React from "react";
import Song from "./Song";
<<<<<<< HEAD
import '../../public/assets/css/SongFeed.css';
=======
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

class SongFeed extends React.Component {
    render() {
        const { songs } = this.props;

<<<<<<< HEAD
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
=======
        return(
            <div>
                {songs.map((song, index) => (
                  <div key={index}>
                    <Song 
                      title={song.title} 
                      link={song.link} 
                    />
                  </div>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                ))}
            </div>
        );
    }
};

export default SongFeed;