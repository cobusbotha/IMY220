import React from 'react';
import '../../public/assets/css/CreateSong.css';

class CreateSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { title, link } = this.state;
        const newSong = { title, link };

        try {
            const response = await fetch('/api/createsong', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSong),
            });

            if (response.ok) {
                this.setState({
                    title: '',
                    link: ''
                });
            } else {
                const errorData = await response.json();
                this.setState({ message: `Error: ${errorData.message}` });
            }
        } catch (error) {
            this.setState({ message: `Error: ${error.message}` });
        }
    };

    render() {
        const { title, link } = this.state;

        return (
            <div>
                <h2 id="create-song">Add Song</h2>
                <form onSubmit={this.handleSubmit} className="create-song-form">
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Spotify Link:</label>
                        <input
                            type="text"
                            name="link"
                            value={link}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Create Song</button>
                </form>
            </div>
        );
    }
}

export default CreateSong;