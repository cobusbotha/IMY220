import React from 'react';
<<<<<<< HEAD
import '../../public/assets/css/Splash.css';
import Login from '../components/Login.js';
import Register from '../components/Register.js';
=======
import Login from '../components/Login.js';
import Register from '../components/Register.js';
 
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

class Splash extends React.Component {
    render() {
        return (
<<<<<<< HEAD
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
=======
            <div className='min-h-screen flex flex-col justify-center items-center bg-primary'>
                <div className='flex flex-col justify-center items-center mb-8'>
                    <h1 className='font-JunK text-9xl text-secondary'>Allegro</h1>
                </div>
                <div className='grid grid-cols-2 gap-20'>
                    <div className='flex justify-center items-center'>
                        <Login />
                    </div>
                    <div className='flex justify-center items-center'>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                        <Register />
                    </div>
                </div>
            </div>
        );
    }
}

export default Splash;
