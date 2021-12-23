import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from '@auth0/auth0-react'
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

ReactDOM.render(
  <Auth0Provider domain="dev-tghowmdv.us.auth0.com"
  clientId="56Ehghr655GZtuci3YEq1rhmXcTTYMr6"
  redirectUri="http://localhost:3000">
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

