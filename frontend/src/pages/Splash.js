import React from 'react';
import '../../public/assets/css/Splash.css';
import Login from '../components/Login.js';
import Register from '../components/Register.js';

class Splash extends React.Component {
    render() {
        return (
            <div className="splash-container">
                <div className="splash-header">
                    <h1>Allegro.</h1>
                    <p>
                        Discover and stream millions of songs with Allegro. Explore new artists, create your own playlists, and enjoy a seamless music experience tailored just for you.
                    </p>
                </div>
                <div className="splash-actions">
                    <div>
                        <Login />
                    </div>
                    <div>
                        <Register />
                    </div>
                </div>
            </div>
        );
    }
}

export default Splash;
