import React from "react";
import ProfilePreview from "./ProfilePreview";
<<<<<<< HEAD
import '../../public/assets/css/Following.css';
=======
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

class Following extends React.Component {
    state = {
        following: []
    };

    componentDidMount() {
        this.fetchFollowing();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId) {
            this.fetchFollowing();
        }
    }

    fetchFollowing = () => {
        const { userId } = this.props;
        
        fetch(`/api/users/${userId}/following`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ following: data });
            })
            .catch(error => {
                console.error('Error fetching following:', error);
            });
    }

    render() {
        const { following } = this.state;
        return (
<<<<<<< HEAD
            <div className="following-container">
                <h3>Following</h3>
                {following.length > 0 ? (
                    following.map((follower, index) => (
                        <div key={index} className="following-item">
=======
            <div>
                <h3>Following</h3>
                {following.length > 0 ? (
                    following.map((follower, index) => (
                        <div key={index}>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                            <ProfilePreview image={follower.imageUrl} username={follower.username} />
                        </div>
                    ))
                ) : (
                    <p>No following available.</p>
                )}
            </div>
        );
    }
}

export default Following;