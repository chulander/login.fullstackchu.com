import React, { Component } from 'react';
import { AuthService, withAuth } from './component';
import logo from './resource/logo.svg';
import './App.css';

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

  // componentWillMount() {
  //   const token = Auth.getToken();
  //   if (token) {
  //     console.log('token exists during route "succes" mount');
  //     // fetch('https://login.fullstackchu.com', {
  //     //   method: 'post',
  //     //   body: {
  //     //     token
  //     //   }
  //     // })
  //     fetch('https://login.fullstackchu.com', {
  //       method: 'post'
  //     })
  //       .then(res => {
  //         console.log('success auth token: res', res);
  //       })
  //       .catch(err => {
  //         console.error('error auth token: ', err);
  //       });
  //   } else {
  //     const {
  //       history: {
  //         replace = function() {
  //           void 0;
  //         }
  //       } = {}
  //     } = this.props;

  //     replace('/');
  //   }
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.props.user && <h2>Welcome {this.props.user.username}</h2>}
          <p className="App-intro">
            <button
              type="button"
              className="form-submit"
              onClick={this.handleLogout}
            >
              Logout
            </button>
          </p>
        </header>
      </div>
    );
  }
}

export default withAuth(App);
