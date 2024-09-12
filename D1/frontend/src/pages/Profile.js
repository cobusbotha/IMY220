import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Navigation from "../components/Navigation";
import Create from "../components/Create";
import Profiles from "../components/Profiles";
import Edit from "../components/Edit";
import PlaylistPreview from "../components/PlaylistPreview";
import Song from "../components/Song";
import Followings from "../components/Followings";

const playlist = [
  {title: "Songs to cry to...", description: "List of songs to cry to...", numSongs: "13", imageURL: "/assets/images/placeholder.png", hashtags: ["#sad", "#depro"]},
  {title: "Songs to dance to...", description: "List of songs to dance to", numSongs: "23", imageURL: "/assets/images/placeholder.png", hashtags: ["#upbeat", "#happy"]},
  {title: "Song to crash the car to...", description: "List of songs to crash the car to...", numSongs: "74", imageURL: "/assets/images/placeholder.png", hashtags: ["#hype", "crazy"]},
];

const songs = [
  {title: "Beat It", artist: "Michael Jackson", link: "www.fakelink.com",dateAdded: "2024/04/23", addedBy:"user1234"},
  {title: "Bitter Sweet Symphony", artist: "The Verve", link: "www.fakelink.com",dateAdded: "2024/04/23", addedBy:"user1234"},
  {title: "We Are The People", artist: "Empire of the Sun", link: "www.fakelink.com",dateAdded: "2024/04/23", addedBy:"user1234"},
  {title: "Breezeblocks", artist: "Alt-J", link: "www.fakelink.com",dateAdded: "2024/04/23", addedBy:"user1234"},
  {title: "Eventually", artist: "Tame Impala", link: "www.fakelink.com",dateAdded: "2024/04/23", addedBy:"user1234"},
];

const followersData = [
  {username: "Follower 1", profilePicture: "/assets/images/placeholder.png", bio: "Vibes, music and pizza", numFollowers: 123, socials: "Instagram", age: 21},
  {username: "Follower 2", profilePicture: "/assets/images/placeholder.png", bio: "Vibes, music and pizza", numFollowers: 123, socials: "Instagram", age: 21},
];

const followingData = [
  {username: "Following 1", profilePicture: "/assets/images/placeholder.png", bio: "Vibes, music and pizza", numFollowers: 123, socials: "Instagram", age: 21},
  {username: "Following 2", profilePicture: "/assets/images/placeholder.png", bio: "Vibes, music and pizza", numFollowers: 123, socials: "Instagram", age: 21},
];

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [showCreatePlaylistForm, setShowCreatePlaylistForm] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showFollowers, setShowFollowers] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
    const fetchedProfile = {
      username: "Cobus Botha",
      profilePicture: "/assets/images/placeholder.png",
      bio: "Vibes, music and pizza",
      numFollowers: 123,
      socials: "Instagram",
      age: 21,
      isFriend: false,
      email: "cobus@gmail.com",
    };

    setProfile(fetchedProfile);
      setIsOwnProfile(userId === "userId");
    };

      fetchProfileData();
    }, [userId]);

    const handleCreatePlaylistToggle = () => {
      setShowCreatePlaylistForm(!showCreatePlaylistForm);
    };

    const handleEditProfileToggle = () => {
      setIsEditingProfile(!isEditingProfile);
    };

    const handleFriendToggle = () => {
      setIsFriend(!isFriend);
    };

    const updateProfile = (updatedProfile) => {
      setProfile((prefProfile) => ({...prefProfile, ...updatedProfile}));
      setIsEditingProfile(!isEditingProfile);
    }
    
  return (
    <div>
      <Navigation />
      {/* Show Create Playlist button */}
      <div className="playlist-button">
        <button onClick={handleCreatePlaylistToggle}>
        {showCreatePlaylistForm ? "Hide Create Playlist" : "Create Playlist"}
        </button>
      </div>
      {/* Show Create Playlist form */}
      {showCreatePlaylistForm ? (
      <Create />
      ) : (
        <div className="profile-page">
          <div className="top">
            <div className="profile-info">
              {!isEditingProfile ? (
                <Profiles
                  username={profile?.username}
                  profilePicture={profile?.profilePicture}
                  bio={profile?.bio}
                  email={profile?.email}
                  numFollowers={profile?.numFollowers}
                  socials={profile?.socials}
                  age={profile?.age}
                  toggleEditProfile={handleEditProfileToggle}
                  isFriend={profile?.isFriend}
                  onFriendToggle={handleFriendToggle}
                  currentUser={"Cobus Botha"}
                />
              ) : (
                <Edit
                  username={profile.username}
                  profilePicture={profile.profilePicture}
                  bio={profile.bio}
                  email={profile.email}
                  updateProfile={updateProfile}
                  toggleEditProfile={handleEditProfileToggle}
                />
              )}
            </div>
            <div className="follower/following">
              <div className="follower/following-toggle">
                <button onClick={() => setShowFollowers(true)}>Followers</button>
                <button onClick={() => setShowFollowers(false)}>Following</button>
              </div>
              {showFollowers ? (
                <div className="followers">
                  <h2>Followers</h2>
                  <Followings users={followersData} type="followers" />
                </div>
              ) : (
                <div className="following-">
                  <h2>Following</h2>
                  <Followings users={followingData} type="following" />
                </div>
              )}
            </div>
          </div>
          <div className="song/playlist">
            <div className="users-playlist">
              <h2>My Playlists</h2>
              {playlist.map((playlist, index) => (
                <PlaylistPreview
                  key={index}
                  title={playlist.title}
                  description={playlist.description}
                  numSongs={playlist.numSongs}
                  imageURL={playlist.imageURL}
                  hashtags={playlist.hashtags}
                  onHashtagClick={() => {}}
                />
              ))}
            </div>
            <div className="users-songs">
              <h2>My Songs</h2>
              {songs.map((song, index) => (
                <Song
                  key={index}
                  name={song.title}
                  artist={song.artist}
                  link={song.link}
                  dateAdded={song.dateAdded}
                  addedBy={song.addedBy}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;