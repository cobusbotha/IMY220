import React, { useState } from "react";
<<<<<<< HEAD
import { getCookie } from '../utils/cookie';
import '../../public/assets/css/SearchInput.css';

const SearchInput = ({ onSearchResults }) => {
    const [term, setTerm] = useState("");
    const [type, setType] = useState("playlists");
=======

const SearchInput = ({ onSearchResults }) => {
    const [term, setTerm] = useState("");
    const [type, setType] = useState("playlists"); // Default search type
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

    const handleInputChange = (event) => {
        setTerm(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
<<<<<<< HEAD
        const userId = getCookie('userId'); 
        try {
            const response = await fetch(`/api/search?term=${term}&type=${type}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': userId
                }
            });
=======
        try {
            const response = await fetch(`/api/search?term=${term}&type=${type}`);
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
            const data = await response.json();
            onSearchResults(data, type);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
<<<<<<< HEAD
    };    

    return (
        <div>
            <form onSubmit={handleSubmit} className="search-input-form">
                <div>
                    <label htmlFor="search">Enter search term</label>
=======
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 pl-4 gap-4">
                <div className="flex flex-col">
                    <label htmlFor="search" className="text-white mb-2">Enter search term</label>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                    <input
                        id="search"
                        placeholder="Enter search term here..."
                        type="text"
                        value={term}
                        onChange={handleInputChange}
<<<<<<< HEAD
                    />
                </div>
                <div>
                    <label htmlFor="type">Select search type</label>
                    <select id="type" value={type} onChange={handleTypeChange}>
=======
                        className="p-2 rounded border border-gray-300 text-black"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="type" className="text-white mb-2">Select search type</label>
                    <select id="type" value={type} onChange={handleTypeChange} className="p-2 rounded border border-gray-300 text-black">
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                        <option value="playlists">Playlists</option>
                        <option value="songs">Songs</option>
                        <option value="users">Users</option>
                    </select>
                </div>
<<<<<<< HEAD
                <button type="submit">
=======
                <button type="submit" className="bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 p-4">
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                    Search
                </button>
            </form>
        </div>
    );
};

<<<<<<< HEAD
export default SearchInput;
=======
export default SearchInput;
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
