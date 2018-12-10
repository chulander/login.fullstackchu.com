import React, { Component } from 'react';
import { AuthService, Collection, withAuth } from './component';
// import logo from './resource/logo.png';
// import './App.css';

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
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       {this.props.user && <h2>Welcome {this.props.user.username}</h2>}
    //       <p className="App-intro">
    //         <button
    //           type="button"
    //           className="form-submit"
    //           onClick={this.handleLogout}
    //         >
    //           Logout
    //         </button>
    //       </p>
    //     </header>
    //   </div>
    // );
  }
}

export default withAuth(App);
