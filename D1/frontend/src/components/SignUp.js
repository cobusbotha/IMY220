import React from "react";

class SignUp extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" placeholder="Username" id="username"/>
        <br/>
        <label htmlFor="password">Password:</label>
        <input type="password" placeholder="Password" id="password"/>
        <br/>
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="E-mail" id="email"/>
        <br/>
        <button type="submit" id="register">Sign Up</button>
      </form>
    );
  }
};

export default SignUp;