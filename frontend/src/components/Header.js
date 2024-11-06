import React from 'react';
import { Link } from 'react-router-dom';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';
import '../../public/assets/css/Header.css';

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
                        Logout
                    </button>
                </div>
            </nav>
        );
    }
}

export default Header;