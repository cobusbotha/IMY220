const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs'); 
const path = require('path');
require('dotenv').config(); 

const url = `mongodb+srv://${process.env.MONGODBUSERNAME}:${encodeURIComponent(process.env.MONGODBPASSWORD)}@imy220.p46ps.mongodb.net/?retryWrites=true&w=majority&appName=IMY220`;
const client = new MongoClient(url);

const app = express();
app.use(express.json()); 
app.use(cookieParser()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

app.use(express.static('./frontend/public'));

async function startServer() {
    await client.connect();
    
    const db = client.db('IMY220-Project');
    const SongCollection = db.collection('songs');
    const PlaylistCollection = db.collection('playlists');
    const UserCollection = db.collection('users');

    // await UserCollection.updateMany(
    //     { friendRequests: { $exists: false } },
    //     { $set: { friendRequests: [] } }
    // );

    // async function addSavedPlaylistsFieldToUsers() {
    //     const db = client.db('IMY220-Project');  
    //     const UserCollection = db.collection('users');
        
    //     try {
    //         const result = await UserCollection.updateMany(
    //             { savedPlaylists: { $exists: false } },  
    //             { $set: { savedPlaylists: [] } }        
    //         );
    //         console.log(`Matched ${result.matchedCount} users, modified ${result.modifiedCount} users.`);
    //     } catch (error) {
    //         console.error("Error adding 'savedPlaylists' field to users:", error);
    //     }
    // }
    
    // addSavedPlaylistsFieldToUsers();    

    app.get('/api/songs', async (req, res) => {
        try {
            const songs = await SongCollection.find().sort({ dateAdded: -1 }).toArray();
            res.json(songs);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/api/users/:id', async (req, res) => {
        const { id } = req.params;
        const loggedInUserId = req.headers['user-id'];
        try {
            const user = await UserCollection.findOne({ _id: id });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const isFriend = user.followerIDs.includes(loggedInUserId);
            if (!isFriend) {
                return res.status(200).json({
                    _id: user._id,
                    username: user.username,
                    imageUrl: user.imageUrl
                });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.get('/api/playlists/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserCollection.findOne({ _id: id });
            
            if (!user) {
                return res.status(404).send("User not found");
            }
    
            const playlistIDs = user.playlistIDs || [];
    
            const playlists = await PlaylistCollection.find({ playlistID: { $in: playlistIDs } }).toArray();
    
            res.json(playlists);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/api/playlist/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const playlist = await PlaylistCollection.findOne({ playlistID: id });
            
            if (!playlist) {
                return res.status(404).send("playlist not found");
            }

    
            res.json(playlist);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/api/playlist/:id/songs', async (req, res) => {
        const { id } = req.params;
        try {
            const playlist = await PlaylistCollection.findOne({ playlistID: id });

            if (!playlist) {
                return res.status(404).send("Playlist not found");
            }

            const songIDs = playlist.songIDs || [];

            const songs = await SongCollection.find({ songID: { $in: songIDs } }).toArray();

            res.json(songs);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post('/api/register', async (req, res) => {
        const { username, password, email } = req.body;
        try {
            const existingUser = await UserCollection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            let customId;
            let isUnique = false;
            while (!isUnique) {
                customId = `user${Math.floor(Math.random() * 10000)}`;
                const existingId = await UserCollection.findOne({ _id: customId });
                if (!existingId) {
                    isUnique = true;
                }
            }
    
            const newUser = {
                _id: customId,
                description: '', 
                imageUrl: '/assets/images/placeholder.webp', 
                username, 
                email,
                password: hashedPassword, 
                playlistIDs: [],
                followerIDs: [],
                followingIDs: [],
                friendRequests: [],
                savedPlaylists: []
            };
            
            await UserCollection.insertOne(newUser);
            res.status(201).send("User registered successfully");
        } catch (err) {
            res.status(500).send(err);
        }
    });    

    app.get('/api/users/:id/friend-requests', async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserCollection.findOne({ _id: id });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const friendRequests = await UserCollection.find({ _id: { $in: user.friendRequests } }).toArray();

            res.json(friendRequests);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
            res.status(500).json({ error: error.message });
        }
    });
   
    app.post('/api/accept-friend-request', async (req, res) => {
        const { userId, friendId } = req.body;
    
        try {
            const userUpdateResult = await UserCollection.updateOne(
                { _id: userId },
                {
                    $addToSet: {
                        followerIDs: friendId, 
                        followingIDs: friendId
                    },
                    $pull: { friendRequests: friendId }
                }
            );
    
            const friendUpdateResult = await UserCollection.updateOne(
                { _id: friendId },
                {
                    $addToSet: {
                        followerIDs: userId, 
                        followingIDs: userId 
                    }
                }
            );
    
            if (userUpdateResult.modifiedCount === 0 || friendUpdateResult.modifiedCount === 0) {
                return res.status(500).json({ message: 'Failed to update follower/following lists.' });
            }
    
            res.status(200).json({ message: 'Friend request accepted' });
        } catch (err) {
            console.error('Error in accepting friend request:', err);
            res.status(500).json({ error: err.message });
        }
    });

    app.post('/api/unfriend', async (req, res) => {
        const { userId, friendId } = req.body;
        try {
            await UserCollection.updateOne(
                { _id: userId },
                { $pull: { followerIDs: friendId, followingIDs: friendId } }
            );
            await UserCollection.updateOne(
                { _id: friendId },
                { $pull: { followerIDs: userId, followingIDs: userId } }
            );
            res.status(200).json({ message: 'Unfriended successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.post('/api/friend-request', async (req, res) => {
        const { userId, friendId } = req.body;
    
        try {
            const user = await UserCollection.findOne({ _id: userId });
    
            if (user.followingIDs.includes(friendId)) {
                return res.status(400).json({ message: "You are already following this user." });
            }
    
            if (user.friendRequestsSent && user.friendRequestsSent.includes(friendId)) {
                return res.status(400).json({ message: "Friend request already sent." });
            }

            await UserCollection.updateOne(
                { _id: userId },
                { $addToSet: { friendRequestsSent: friendId } }
            );
    
            await UserCollection.updateOne(
                { _id: friendId },
                { $addToSet: { friendRequests: userId } }
            );
    
            res.status(200).json({ message: "Friend request sent successfully" });
        } catch (error) {
            console.error("Error sending friend request:", error);
            res.status(500).json({ error: error.message });
        }
    });     

    app.post('/api/reject-friend-request', async (req, res) => {
        const { userId, friendId } = req.body;
        try {
            await UserCollection.updateOne(
                { _id: userId },
                { $pull: { friendRequests: friendId } }
            );
            res.status(200).json({ message: 'Friend request rejected' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });    

    app.post("/api/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log("Login attempt with email:", email);
            const user = await UserCollection.findOne({ email });
            if (!user) {
                console.log("User not found with email:", email);
                return res.status(400).json({ message: "Invalid email or password" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("Password valid:", isPasswordValid);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid email or password" });
            }
    
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true });
            res.json({ message: "Login successful", token, userId: user._id });
        } catch (err) {
            console.error("Error logging in user:", err);
            res.status(500).send(err);
        }
    });

    app.post('/api/logout', (req, res) => {
        res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true });
        res.status(200).send("Logged out successfully");
    });

    app.delete('/api/user/:id', async (req, res) => {
        const { id } = req.params;
        const loggedInUserId = req.headers['user-id']; 
    
        if (id !== loggedInUserId) {
            return res.status(403).json({ message: "You can only delete your own account" });
        }
    
        try {
            const result = await UserCollection.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "Account deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.delete('/api/playlists/:playlistId', async (req, res) => {
        const { playlistId } = req.params;
        const userId = req.headers['user-id'];
    
        try {
            const playlist = await PlaylistCollection.findOne({ playlistID: playlistId });
    
            if (!playlist) {
                return res.status(404).json({ message: 'Playlist not found' });
            }

            if (!playlist.userIDs.includes(userId)) {
                return res.status(403).json({ message: 'You do not have permission to delete this playlist' });
            }

            await PlaylistCollection.deleteOne({ playlistID: playlistId });

            await UserCollection.updateOne(
                { _id: userId },
                { $pull: { playlistIDs: playlistId } }
            );
    
            res.status(200).json({ message: 'Playlist deleted successfully' });
        } catch (error) {
            console.error('Error deleting playlist:', error);
            res.status(500).json({ error: 'An error occurred while deleting the playlist' });
        }
    });    

    app.get('/api/user/:userId/following/playlists', async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await UserCollection.findOne({ _id: userId });

            if (!user) {
                return res.status(404).send('User not found');
            }

            const friends = user.followingIDs || [];

            const playlists = await PlaylistCollection.find({ userIDs: { $in: friends }}).toArray();
            res.json(playlists);
        } catch (err) {
            console.error('Error fetching playlists:', err);
            res.status(500).send(err);
        }
    });

    app.get('/api/users/:id/followers', async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserCollection.findOne({ _id: id });
            if (!user) {
                return res.status(404).send("User not found");
            }
    
            const followers = await UserCollection.find({ _id: { $in: user.followerIDs } }).toArray();
            res.json(followers);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/api/users/:id/following', async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserCollection.findOne({ _id: id });
            if (!user) {
                return res.status(404).send("User not found");
            }
    
            const following = await UserCollection.find({ _id: { $in: user.followingIDs } }).toArray();
            res.json(following);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.put('/api/users/:id', upload.single('image'), async (req, res) => {
        const { id } = req.params;
        const { username, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
    
        try {
  
            const updateData = { username, description };
            if (image) {
                updateData.imageUrl = image;
            }
   
            const result = await UserCollection.updateOne(
                { _id: id },
                { $set: updateData }
            );
    
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const updatedUser = await UserCollection.findOne({ _id: id });
    
            res.status(200).json({
                _id: updatedUser._id,
                username: updatedUser.username,
                description: updatedUser.description,
                imageUrl: updatedUser.imageUrl,
                email: updatedUser.email,
                playlistIDs: updatedUser.playlistIDs,
                followerIDs: updatedUser.followerIDs,
                followingIDs: updatedUser.followingIDs
            });
        } catch (err) {
            console.error('Error updating profile:', err);
            res.status(500).json({ error: err.message });
        }
    });
    

    app.put('/api/playlist/:id', async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        const loggedInUserId = req.headers['user-id']; 
    
        try {
            const playlist = await PlaylistCollection.findOne({ playlistID: id });
            if (!playlist) {
                return res.status(404).json({ message: "Playlist not found" });
            }
    
            if (!playlist.userID.includes(loggedInUserId)) {
                return res.status(403).json({ message: "You are not the owner of this playlist" });
            }
    
            const result = await PlaylistCollection.updateOne(
                { playlistID: id },
                { $set: { name, description } }
            );
    
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Playlist not found" });
            }
    
            res.status(200).json({ message: "Playlist updated successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.post('/api/createplaylist', upload.single('image'), async (req, res) => {
        const { name, description } = req.body;
        const userId = req.headers['user-id'];
    
        try {
            const user = await UserCollection.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            let customId;
            let isUnique = false;
            while (!isUnique) {
                customId = `PL${Math.floor(Math.random() * 10000)}`;
                const existingId = await PlaylistCollection.findOne({ playlistID: customId });
                if (!existingId) {
                    isUnique = true;
                }
            }
    
            const newPlaylist = {
                playlistID: customId,
                name,
                description,
                imageUrl: req.file ? `/uploads/${req.file.filename}` : '/assets/images/placeholder.png',
                comments: [],
                userIDs: [userId], // Associate this playlist with the user
                songIDs: [],
                dateCreated: new Date(),
            };
    
            await PlaylistCollection.insertOne(newPlaylist);
    
            await UserCollection.updateOne(
                { _id: userId },
                { $push: { playlistIDs: customId } }
            );
    
            res.status(201).json({ message: "Playlist created successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });            

    app.delete('/api/playlists/:playlistId/remove', async (req, res) => {
        const { playlistId } = req.params;
        const loggedInUserId = req.headers['user-id'];
        try {
            const playlist = await PlaylistCollection.findOne({ playlistID: playlistId });
            if (!playlist) {
                return res.status(404).json({ message: "Playlist not found" });
            }
            const user = await UserCollection.findOne({ _id: loggedInUserId, savedPlaylists: playlistId });
            if (!user) {
                return res.status(403).json({ message: "Playlist is not saved in the user's library" });
            }
            await UserCollection.updateOne(
                { _id: loggedInUserId },
                { $pull: { savedPlaylists: playlistId } }
            );
    
            res.status(200).json({ message: "Playlist removed from user library successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });    

    app.post('/api/playlists/:playlistId/add', async (req, res) => {
        const { playlistId } = req.params;
        const { trackId } = req.body;
    
        try {
            const playlist = await PlaylistCollection.findOne({ playlistID: playlistId });
            if (!playlist) {
                return res.status(404).json({ message: "Playlist not found" });
            }
    
            await PlaylistCollection.updateOne(
                { playlistID: playlistId },
                { $push: { songIDs: trackId } }
            );

            await SongCollection.updateOne(
                { songID: trackId },
                { $addToSet: { playlistIDs: playlistId } }
            );
    
            res.status(200).json({ message: "Song added to playlist successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.put('/api/createsong', async (req, res) => {
        const { title, link } = req.body;
    
        if (!title || !link) {
            return res.status(400).json({ message: 'Title and link are required' });
        }
    
        try {
            let customId;
            let isUnique = false;
            while (!isUnique) {
                customId = generateSongID(title);
                const existingId = await SongCollection.findOne({ songID: customId });
                if (!existingId) {
                    isUnique = true;
                }
            }

            const newSong = {
                songID: customId,
                title,
                link,
                playlistIDs: [],
                userIDs: [],
                dateAdded: new Date()
            };
    
            await SongCollection.insertOne(newSong);
    
            res.status(201).json({ message: 'Song created successfully', song: newSong });
        } catch (error) {
            console.error('Error creating song:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    
    function generateSongID(title) {
        return title
            .split(' ')
            .map(word => word[0].toLowerCase())
            .join('');
    }

    app.delete('/api/songs/:songID', async (req, res) => {
        const { songID } = req.params;
    
        try {
            const result = await SongCollection.deleteOne({ songID });
    
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Song not found' });
            }
    
            res.status(200).json({ message: 'Song deleted successfully' });
        } catch (error) {
            console.error('Error deleting song:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.get('/api/user/:userId/playlists', async (req, res) => {
        const { userId } = req.params;
    
        try {
            const user = await UserCollection.findOne({ _id: userId });
            if (!user) {
                return res.status(404).send("User not found");
            }
            const userPlaylists = await PlaylistCollection.find({ userIDs: userId }).toArray();

            const savedPlaylists = await PlaylistCollection.find({ playlistID: { $in: user.savedPlaylists || [] } }).toArray();
    
            const playlists = [...userPlaylists, ...savedPlaylists].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
            res.json(playlists);
        } catch (err) {
            res.status(500).send(err);
        }
    });     
    
    app.post('/api/user/:userId/save-playlist', async (req, res) => {
        const { userId } = req.params;
        const { playlistId } = req.body;
    
        try {
            const user = await UserCollection.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.savedPlaylists && user.savedPlaylists.includes(playlistId)) {
                return res.status(400).json({ message: "Playlist already saved" });
            }

            await UserCollection.updateOne(
                { _id: userId },
                { $addToSet: { savedPlaylists: playlistId } }
            );
    
            res.status(200).json({ message: "Playlist saved successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });    

    app.get('/api/search', async (req, res) => {
        const { term, type } = req.query;
        const loggedInUserId = req.headers['user-id'];
    
        try {
            let results;
            switch (type) {
                case 'users':
                    results = await UserCollection.find({
                        username: { $regex: term, $options: 'i' }
                    }).toArray();
    
                    results = results.map(user => ({
                        ...user,
                        isFollowed: user.followerIDs.includes(loggedInUserId),
                        friendRequestSent: user.friendRequests.includes(loggedInUserId)
                    }));
                    console.log("Search results with follow flags:", results);
                    break;
                case 'playlists':
                    results = await PlaylistCollection.find({ name: { $regex: term, $options: 'i' } }).toArray();
                    break;
                case 'songs':
                    results = await SongCollection.find({ title: { $regex: term, $options: 'i' } }).toArray();
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid search type' });
            }
            res.status(200).json(results);
        } catch (error) {
            console.error('Error searching:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });  

    app.post('/api/playlist/:playlistId/comment', async (req, res) => {
        const { playlistId } = req.params;
        const { userId, comment } = req.body;
    
        try {
            const user = await UserCollection.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const playlist = await PlaylistCollection.findOne({ playlistID: playlistId });
            if (!playlist) {
                return res.status(404).json({ message: "Playlist not found" });
            }

            const isAuthorized = playlist.userIDs.includes(userId) || (user.savedPlaylists && user.savedPlaylists.includes(playlistId));
            if (!isAuthorized) {
                return res.status(403).json({ message: "You are not authorized to comment on this playlist" });
            }

            await PlaylistCollection.updateOne(
                { playlistID: playlistId },
                { $push: { comments: { author: user.username, comment, date: new Date() } } }
            );
    
            res.status(201).json({ message: "Comment added successfully" });
        } catch (error) {
            console.error("Error adding comment:", error);
            res.status(500).json({ error: error.message });
        }
    });       
    
    app.get('/api/users/:id/details', async (req, res) => {
        const { id } = req.params;
        const loggedInUserId = req.headers['user-id'];
    
        try {
            const user = await UserCollection.findOne({ _id: id });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!user.followerIDs.includes(loggedInUserId)) {
                return res.status(403).json({ message: 'You are not allowed to view these details.' });
            }

            const friends = await UserCollection.find({ _id: { $in: user.followingIDs } }).toArray();
            const playlists = await PlaylistCollection.find({ playlistID: { $in: user.playlistIDs } }).toArray();
    
            res.json({
                description: user.description,
                friends,
                playlists,
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });    

    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: './frontend/public' });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Running on port http://localhost:${PORT}\n`);
    })
};

startServer();