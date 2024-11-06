import React, { useState } from "react";
import { getCookie } from '../utils/cookie';
import '../../public/assets/css/SearchInput.css';

const SearchInput = ({ onSearchResults }) => {
    const [term, setTerm] = useState("");
    const [type, setType] = useState("playlists");

    const handleInputChange = (event) => {
        setTerm(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = getCookie('userId'); 
        try {
            const response = await fetch(`/api/search?term=${term}&type=${type}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': userId
                }
            });
            const data = await response.json();
            onSearchResults(data, type);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };    

    return (
        <div>
            <form onSubmit={handleSubmit} className="search-input-form">
                <div>
                    <label htmlFor="search">Enter search term</label>
                    <input
                        id="search"
                        placeholder="Enter search term here..."
                        type="text"
                        value={term}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="type">Select search type</label>
                    <select id="type" value={type} onChange={handleTypeChange}>
                        <option value="playlists">Playlists</option>
                        <option value="songs">Songs</option>
                        <option value="users">Users</option>
                    </select>
                </div>
                <button type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
