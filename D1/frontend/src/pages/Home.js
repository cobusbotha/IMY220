import React from 'react';
import Navigation from "../components/Navigation.js";
import Feed from '../components/Feed.js';
import Playlists from '../components/Playlists.js';
import Search from '../components/Search.js';

class Home extends React.Component {
  render() {
    const songsOnFeed = [
      {
        title: "Beat It",
        artist: "Michael Jackson",
        link: "www.fakelink.com",
        imageUrl: "/assets/images/placeholder.png"
      },
      {
        title: "Bitter Sweet Symphony",
        artist: "The Verve",
        link: "www.fakelink.com",
        imageUrl: "/assets/images/placeholder.png"
      },
      {
        title: "We Are The People",
        artist: "Empire of the Sun",
        link: "www.fakelink.com",
        imageUrl: "/assets/images/placeholder.png"
      },
      {
        title: "Breezeblocks",
        artist: "Alt-J",
        link: "www.fakelink.com",
        imageUrl: "/assets/images/placeholder.png"
      },
      {
        title: "Eventually",
        artist: "Tame Impala",
        link: "www.fakelink.com",
        imageUrl: "/assets/images/placeholder.png"
      },
      {
        title: "Little Lion Man",
        artist: "Mumford & Sons",
        link: "www.dummylink5.com",
        imageUrl: "/assets/images/placeholder.png"
      },
      {
        title: "Cocaine Jesus",
        artist: "Rainbow Kitten Surprise",
        link: "www.dummylink5.com",
        imageUrl: "/assets/images/placeholder.png"
      }
      ,
      {
        title: "Do I Wanna Know",
        artist: "Arctic Monkeys",
        link: "www.dummylink5.com",
        imageUrl: "/assets/images/placeholder.png"
      },
      {
        title: "They Dont Care About Us",
        artist: "Michael Jackson",
        link: "www.dummylink5.com",
        imageUrl: "/assets/images/placeholder.png"
      }
    ];
    const usersPlaylists = [
      {
        title: "Songs to cry to...",
        description: "List of songs to cry to",
        imageUrl: "/assets/images/placeholder.png"
      },
      {
        title: "Songs to dance to...",
        description: "List of songs to dance to",
        imageUrl: "/assets/images/placeholder.png"
      },
      {
        title: "Songs to crash the car to...",
        description: "List of songs to crash the car to",
        imageUrl: "/assets/images/placeholder.png"
      },
    ]

    return (
      <div>
        <h1>Home</h1>
        <Navigation />
        <Search />
        <Feed songs={ songsOnFeed } />
        <Playlists playlists={ usersPlaylists } />
      </div>
    );
  }
}

export default Home;