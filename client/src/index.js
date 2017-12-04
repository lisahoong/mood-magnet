import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
