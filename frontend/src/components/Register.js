import React from "react";
import '../../public/assets/css/Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            problems: {},
            successMessage: ''
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
    
                if (response.ok) {
                    this.setState({
                        successMessage: 'Account created successfully! You can now log in.',
                        problems: {}
                    });
                    console.log('User registered successfully');
                } else {
                    const errorData = await response.json();
                    console.log('Registration failed', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log(this.state.problems);
        }
    };      

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="usernameRegister">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        id="usernameRegister"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        autoComplete="username"
                        className="form-control"
                    />
                    {this.state.problems.username && <span className="error">{this.state.problems.username}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="passwordRegister">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="passwordRegister"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        autoComplete="new-password"
                        className="form-control"
                    />
                    {this.state.problems.password && <span className="error">{this.state.problems.password}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="emailRegister">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        id="emailRegister"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
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
}

export default Register;