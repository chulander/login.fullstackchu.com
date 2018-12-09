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
        console.log('AuthService: wilMount: not logged in');
        const {
          history: {
            replace = function() {
              void 0;
            }
          } = {}
        } = this.props;
        replace('/');
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile
          });
          console.log('AuthService: wilMount: logged in - profile', profile);
        } catch (err) {
          console.log('AuthService: wilMount: logged in error- profile', err);
          Auth.logout();
          this.props.history.replace('/');
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
