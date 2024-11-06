import React from 'react';
import { Link } from 'react-router-dom';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';
<<<<<<< HEAD
import '../../public/assets/css/Header.css';
=======

>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

class Header extends React.Component {
    handleLogout = async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include' 
            });

            deleteCookie('userId');

            window.location.href = '/'; 
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    render() {
        const userID = getCookie('userId');
        return (
<<<<<<< HEAD
            <nav>
                <div className="links">
                    <Link to="/home">
                        Home
                    </Link>
                    <Link to={`/profile/${userID}`}>
                        Profile
                    </Link>
                </div>
                <div className="logout">
                    <button onClick={this.handleLogout}>
=======
            <nav className="flex flex-col items-center space-y-4 p-4 text-3xl h-full">
                <div className="flex flex-col items-center space-y-4 mt-20">
                    <Link to="/home" className="p-2 hover:bg-primary rounded">
                        Home
                    </Link>
                    <Link to={`/profile/${userID}`} className="p-2 hover:bg-primary rounded">
                        Profile
                    </Link>
                </div>
                <div className="mt-auto mb-4">
                    <button onClick={this.handleLogout} className="p-2 hover:bg-primary rounded">
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                        Logout
                    </button>
                </div>
            </nav>
        );
    }
}

export default Header;