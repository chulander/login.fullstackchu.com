import React, { Component, Fragment } from 'react';
import './index.css';
import loginLogo from '../../resource/batman.png';

import AuthService from '../AuthService';

export default class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace('/');
      })
      .catch(err => {
        alert(err);
      });
  };
  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  render() {
    return (
      <Fragment>
        <div className="center">
          <img src={loginLogo} className="App-logo" alt="logo" />
          <div className="card">
            <h1>Login</h1>
            <form onSubmit={this.handleFormSubmit}>
              <input
                className="form-item"
                placeholder="Username goes here..."
                name="username"
                type="text"
                onChange={this.handleChange}
              />
              <input
                className="form-item"
                placeholder="Password goes here..."
                name="password"
                type="password"
                onChange={this.handleChange}
              />
              <input className="form-submit" value="SUBMIT" type="submit" />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}