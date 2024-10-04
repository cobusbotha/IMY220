import React from "react";
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';

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
                    const data = await response.json();
                    setCookie('userId', data.userId, 1); 
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
            <form onSubmit={this.handleSubmit} className="bg-primary rounded-lg p-8 flex flex-col space-y-4 w-full max-w-md mx-auto">
                <div className="flex flex-col">
                    <label htmlFor="emailLogin" className="text-white mb-2">Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        id="emailLogin"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className="p-2 rounded border border-gray-300"
                    />
                    {this.state.problems.email && <span className="text-red-500 mt-1">{this.state.problems.email}</span>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="passwordLogin" className="text-white mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="passwordLogin"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        className="p-2 rounded border border-gray-300"
                    />
                    {this.state.problems.password && <span className="text-red-500 mt-1">{this.state.problems.password}</span>}
                </div>
                <button type="submit" className="bg-white text-secondary py-2 px-4 rounded hover:bg-gray-200 transition duration-300">
                    Login
                </button>
            </form>
        );
    }
};

export default Login;