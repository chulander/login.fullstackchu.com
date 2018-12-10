import decode from 'jwt-decode';

export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || 'https://login.fullstackchu.com'; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}`, {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      this.setToken(res.token); // Setting the token in localStorage
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage

    const token = localStorage.getItem('id_token');
    console.log('getToken: what is token', token);
    return token;
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Setting Authorization header
      // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
      ...(this.loggedIn() ? { Authorization: `Bearer ${this.getToken()}` } : {})
    });

    console.log('fetch method: what is headers', headers);
    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());

    // .then(response => {
    //   if (response.body) {
    //     console.log('what is response.body', response.body.json());
    //     return response.body.json();
    //   }
    // });
  }

  _checkStatus(response) {
    if (response) {
      console.log('what is Parsed response', response);
    }
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      console.log('success response');
      // Success status lies between 200 to 300
      return response;
    } else {
      console.log('_checkStatus: what is error', response);
      return response;
      // var error = new Error(response.statusText);
      // error.response = response;
      // throw error;
    }
  }
}
