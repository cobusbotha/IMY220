import React from "react";
import ProfilePreview from "./ProfilePreview";
import '../../public/assets/css/Followers.css';

class Followers extends React.Component {
    state = {
        followers: []
    };

    componentDidMount() {
        this.fetchFollowers();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId) {
            this.fetchFollowers();
        }
    }

    fetchFollowers = () => {
        const { userId } = this.props;
        
        fetch(`/api/users/${userId}/followers`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ followers: data });
            })
            .catch(error => {
                console.error('Error fetching followers:', error);
            });
    }

    render() {
        const { followers } = this.state;
        return (
            <div className="followers-container">
                <h3>Followers</h3>
                {followers.length > 0 ? (
                    followers.map((follower, index) => (
                        <div key={index} className="follower-item">
                            <ProfilePreview image={follower.imageUrl} username={follower.username} />
                        </div>
                    ))
                ) : (
                    <p>No followers available.</p>
                )}
            </div>
        );
    }
}

export default Followers;