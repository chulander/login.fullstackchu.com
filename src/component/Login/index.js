import React, { Component } from 'react';
import LoginComponent from './Component';
import withAuth from '../withAuth';

import AuthService from '../AuthService';

export class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService('https://login.fullstackchu.com');
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
        console.log('form submit success: res', res);
        const referrer =
          document && document.referrer
            ? document.referrer.replace(/\/$/, '')
            : undefined;
        console.log('what is document.referer', referrer);
        const redirectUrl = referrer
          ? `${referrer}?id_token=${res.token}`
          : res.redirectUrl;
        console.log('what is redirectUrl', redirectUrl);
        window.location.replace(redirectUrl);
        // this.props.history.replace('/success');
      })
      .catch(err => {
        console.log('form submit error-what is error', err);
      });
  };

  render() {
    return (
      <LoginComponent
        handleChange={this.handleChange}
        handleSubmit={this.handleFormSubmit}
        message={this.props.message}
      />
    );
  }
}

export default withAuth(Login);
