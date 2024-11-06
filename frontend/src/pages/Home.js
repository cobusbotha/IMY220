<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
=======
import React from 'react';
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
import Header from "../components/Header.js";
import SongFeed from '../components/SongFeed.js';
import PlaylistFeed from '../components/PlaylistFeed.js';
import SearchInput from '../components/SearchInput.js';
import CreateSong from '../components/CreateSong.js';
<<<<<<< HEAD
import CreatePlaylist from '../components/CreatePlaylist.js';
=======
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
import { getCookie } from '../utils/cookie';
import Song from '../components/Song';
import PlaylistPreview from '../components/PlaylistPreview';
import ProfilePreview from '../components/ProfilePreview';
<<<<<<< HEAD
import '../../public/assets/css/Home.css';

const Home = () => {
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [searchType, setSearchType] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]);
    const [showPlaylists, setShowPlaylists] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchSongs();
        fetchPlaylists();
    }, []);

    const fetchSongs = () => {
        fetch('/api/songs')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => setSongs(data))
            .catch(error => console.error('Error fetching songs:', error));
    };

    const fetchPlaylists = () => {
        const userId = getCookie('userId');
        
        fetch(`/api/user/${userId}/playlists`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const sortedPlaylists = data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
                setPlaylists(sortedPlaylists);
            })
            .catch(error => console.error('Error fetching playlists:', error));
    };       

    const onCreatePlaylist = () => {
        fetchPlaylists(); 
    };

    const handleSearchResults = (results, type) => {
        setSearchResults(results);
        setSearchType(type);
    };

    const handleSendFriendRequest = async (friendId) => {
        const userId = getCookie('userId');
        if (friendRequests.includes(friendId)) {
            console.log("Friend request already sent.");
            return;
        }

        try {
            const response = await fetch('/api/friend-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, friendId }),
            });

            if (!response.ok) {
                const data = await response.json();
                console.log(data.message || 'Error sending friend request');
                return;
            }

            setFriendRequests(prev => [...prev, friendId]);
        } catch (error) {
            console.log("Error sending friend request:", error);
        }
    };

    const handleUnfollow = async (friendId) => {
        const userId = getCookie('userId');

        try {
            const response = await fetch('/api/unfriend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, friendId }),
            });

            if (!response.ok) {
                const data = await response.json();
                console.log(data.message || 'Error unfollowing');
                return;
            }

            setSearchResults(prevResults =>
                prevResults.map(result => result._id === friendId ? { ...result, isFollowed: false } : result)
            );
        } catch (error) {
            console.log("Error unfollowing:", error);
        }
    };

    const toggleFeed = () => setShowPlaylists(prev => !prev);

    const renderSearchResults = () => {
        const loggedInUserId = getCookie('userId');

        if (!searchResults) return null;

        return (
            <div className="search-results">
                <h2>Search Results</h2>
                <ul>
                    {searchResults
                        .filter(result => result._id !== loggedInUserId)
                        .map((result, index) => (
                            <li key={index}>
                                {searchType === 'songs' && <Song title={result.title} link={result.link} />}
                                {searchType === 'playlists' && (
                                    <PlaylistPreview
                                        id={result.playlistID}
                                        name={result.name}
                                        imageUrl={result.imageUrl}
                                        description={result.description}
                                    />
                                )}
                                {searchType === 'users' && (
                                    <div>
                                        <ProfilePreview image={result.imageUrl} username={result.username} />
                                        {result.isFollowed && (
                                            <>
                                                <button
                                                    onClick={() => navigate(`/user/${result._id}`)}
                                                >
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={() => handleUnfollow(result._id)}
                                                >
                                                    Unfollow
                                                </button>
                                            </>
                                        )}
                                        {!result.isFollowed && !result.friendRequestSent && (
                                            <button
                                                onClick={() => handleSendFriendRequest(result._id)}
                                            >
                                                Send Friend Request
                                            </button>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                </ul>
            </div>
        );
    };

    const renderDefaultContent = () => (
        <div className="default-content">
            {showPlaylists ? (
                <>
                    <CreatePlaylist onCreate={onCreatePlaylist} />
                    <PlaylistFeed playlists={playlists} />
                </>
            ) : (
                <>
                    <SongFeed songs={songs} />
                    <CreateSong /> {/* Only show CreateSong when viewing the song feed */}
                </>
            )}
        </div>
    );    

    return (
        <div className="container">
            <Header />
            <button id="toggle-song-playlist" onClick={toggleFeed}>
                {showPlaylists ? 'View Songs' : 'View Playlists'}
            </button>
            <SearchInput onSearchResults={handleSearchResults} />
            {searchResults ? renderSearchResults() : renderDefaultContent()}
        </div>
    );
};
=======

class Home extends React.Component {
    state = {
        songs: [],
        playlists: [],
        searchResults: null,
        searchType: null
    };

    componentDidMount() {
        this.fetchSongs();
        this.fetchPlaylists();
    }

    fetchSongs = () => {
        fetch('/api/songs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ songs: data });
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });
    }

    fetchPlaylists = () => {
        const userId = getCookie('userId');

        fetch(`/api/user/${userId}/following/playlists`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ playlists: data });
            })
            .catch(error => {
                console.error('Error fetching playlists:', error);
            });
    }

    handleSearchResults = (results, type) => {
        this.setState({ searchResults: results, searchType: type });
    }

    renderSearchResults = () => {
        const { searchResults, searchType } = this.state;
        if (!searchResults) return null;

        return (
            <div>
                <h2>Search Results</h2>
                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index}>
                            {searchType === 'songs' && <Song title={result.title} link={result.link} />}
                            {searchType === 'playlists' && <PlaylistPreview id={result.playlistID} name={result.name} imageUrl={result.imageUrl} description={result.description} />}
                            {searchType === 'users' && <ProfilePreview image={result.imageUrl} username={result.username} />}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    renderDefaultContent = () => {
        return (
            <div className="flex-1 p-4">
                <SongFeed songs={this.state.songs} />
                <PlaylistFeed playlists={this.state.playlists} />
                <CreateSong />
            </div>
        );
    }
    
    render() {
        const { searchResults } = this.state;
        return (
            <div className="flex flex-col min-h-screen">
                <header className="top-0 w-full p-4 flex justify-center z-10">
                    <h1 className="font-JunK text-8xl">Allegro</h1>
                </header>
                <div className="flex flex-1 pt-32">
                    <div className="w-36 h-full flex flex-col p-4">
                        <Header />
                    </div>
                    <div className="flex-1">
                        <div className="p-4">
                            <SearchInput onSearchResults={this.handleSearchResults} />
                            {searchResults ? this.renderSearchResults() : this.renderDefaultContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

export default Home;