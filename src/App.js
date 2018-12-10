import React, { Component } from 'react';
import { AuthService, Collection, withAuth } from './component';

const Auth = new AuthService();

class App extends Component {
  handleLogout = () => {
    Auth.logout();
    const {
      history: {
        replace = function() {
          void 0;
        }
      } = {}
    } = this.props;

    replace('/');
  };

  render() {
    return <Collection />;
  }
}

export default withAuth(App);
