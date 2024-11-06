import React from "react";
<<<<<<< HEAD
import '../../public/assets/css/Register.css';
=======
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
<<<<<<< HEAD
            problems: {},
            successMessage: ''
=======
            problems: {}
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validate = () => {
        const problems = {};

        if (!this.state.username) {
            problems.username = "Username is empty";
        }

        if (!this.state.password) {
            problems.password = "Password is empty";
        } else if (this.state.password.length < 5) {
            problems.password = "Password is less than 5 characters";
        }

        if (!this.state.email) {
            problems.email = "Email is empty";
        } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
            problems.email = "Email is invalid";
        }

        this.setState({ problems });
        return Object.keys(problems).length === 0;
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.validate()) {
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email
                    })
                });
<<<<<<< HEAD
    
                if (response.ok) {
                    this.setState({
                        successMessage: 'Account created successfully! You can now log in.',
                        problems: {}
                    });
                    console.log('User registered successfully');
                } else {
                    const errorData = await response.json();
                    console.log('Registration failed', errorData);
=======
                if (response.ok) {
                    console.log('User registered successfully');
                } else {
                    console.log('Registration failed');
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
<<<<<<< HEAD
            console.log(this.state.problems);
        }
    };      

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="usernameRegister">Username</label>
=======
            this.setState((prevState) => {
                console.log(prevState.problems);
                return prevState;
            });
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="bg-primary rounded-lg p-8 flex flex-col space-y-4 w-full max-w-md mx-auto">
                <div className="flex flex-col">
                    <label htmlFor="usernameRegister" className="text-white mb-2">Username</label>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                    <input
                        type="text"
                        placeholder="Username"
                        id="usernameRegister"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
<<<<<<< HEAD
                        autoComplete="username"
                        className="form-control"
                    />
                    {this.state.problems.username && <span className="error">{this.state.problems.username}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="passwordRegister">Password</label>
=======
                        className="p-2 rounded border border-gray-300"
                    />
                    {this.state.problems.username && <span className="text-red-500 mt-1">{this.state.problems.username}</span>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="passwordRegister" className="text-white mb-2">Password</label>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                    <input
                        type="password"
                        placeholder="Password"
                        id="passwordRegister"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
<<<<<<< HEAD
                        autoComplete="new-password"
                        className="form-control"
                    />
                    {this.state.problems.password && <span className="error">{this.state.problems.password}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="emailRegister">Email</label>
=======
                        className="p-2 rounded border border-gray-300"
                    />
                    {this.state.problems.password && <span className="text-red-500 mt-1">{this.state.problems.password}</span>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="emailRegister" className="text-white mb-2">Email</label>
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
                    <input
                        type="email"
                        placeholder="Email"
                        id="emailRegister"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
<<<<<<< HEAD
                        autoComplete="email"
                        className="form-control"
                    />
                    {this.state.problems.email && <span className="error">{this.state.problems.email}</span>}
                </div>
                <button type="submit" className="btn">
                    Register
                </button>
    
                {/* Success message */}
                {this.state.successMessage && <p className="success">{this.state.successMessage}</p>}
            </form>
        );
    }    
=======
                        className="p-2 rounded border border-gray-300"
                    />
                    {this.state.problems.email && <span className="text-red-500 mt-1">{this.state.problems.email}</span>}
                </div>
                <button type="submit" className="bg-white text-secondary py-2 px-4 rounded hover:bg-gray-200 transition duration-300">
                    Register
                </button>
            </form>
        );
    }
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94
}

export default Register;