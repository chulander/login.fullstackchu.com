import React, { Component } from 'react';
import AuthService from '../AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService('https://login.fullstackchu.com');
  return class AuthWrapped extends Component {
    state = {
      user: null
    };
    componentWillMount() {
      if (!Auth.loggedIn()) {
        const {
          history: {
            replace = function() {
              void 0;
            }
          } = {}
        } = this.props;
        replace('/login');
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile
          });
        } catch (err) {
          Auth.logout();
          this.props.history.replace('/login');
        }
      }
    }
    render() {
      return !this.state.user ? null : (
        <AuthComponent history={this.props.history} user={this.state.user} />
      );
    }
  };
}