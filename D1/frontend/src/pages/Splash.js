import React from 'react';
import Login from '../components/Login.js'
import SignUp from '../components/SignUp.js';

class Splash extends React.Component {
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <Login />
        <br/>
        <h1>Otherwise create an account</h1>
        <SignUp />
      </div>
    );
  }
}

export default Splash;