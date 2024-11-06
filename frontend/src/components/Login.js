import React from "react";
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';
import '../../public/assets/css/Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            problems: {}
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name] : value });
    }

    validate = () => {
        const problems = {};

        if (!this.state.email) {
            problems.email = "Email is empty";
        }

        if (!this.state.password) {
            problems.password = "Password is empty";
        } else if (this.state.password.length < 5) {
            problems.password = "Password is less than 5 characters";
        }

        this.setState({ problems });
        return Object.keys(problems).length === 0;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.validate()) {
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password
                    })
                });

                if (response.ok) {
                    console.log("Login successful");
                    const data = await response.json();
                    setCookie('userId', data.userId, 1); 
                    console.log("userId set in cookie:", getCookie('userId'));
                    window.location.href = '/home'; 
                } else {
                    alert("Login failed");
                }
           } catch (error) {
                console.error("Error:", error);
           }
        } else {
            this.setState((prevState) => {
                console.log(prevState.problems);
                return prevState;
            });
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="emailLogin">Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        id="emailLogin"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        autoComplete="email"
                        className="form-control"
                    />
                    {this.state.problems.email && <span className="error">{this.state.problems.email}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="passwordLogin">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="passwordLogin"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        autoComplete="current-password"
                        className="form-control"
                    />
                    {this.state.problems.password && <span className="error">{this.state.problems.password}</span>}
                </div>
                <button type="submit" className="btn">
                    Login
                </button>
            </form>
        );
    }
};

export default Login;