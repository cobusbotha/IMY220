import React from "react";

class Login extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" placeholder="Username" id="username"/>
        <br/>
        <label htmlFor="password">Password:</label>
        <input type="text" placeholder="Password" id="password"/>
        <br/>
        <button type="submit" id="login">Login</button>
      </form>
    );
  }
};

export default Login;