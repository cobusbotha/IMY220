import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/home" style={{ padding: '7px' }}>Home</Link>
        <Link to="/profile" style={{ padding: '7px' }}>Profile</Link>
        <Link to="/playlist" style={{ padding: '7px' }}>Playlist</Link>
      </nav>
    );
  }
}

export default Navigation;