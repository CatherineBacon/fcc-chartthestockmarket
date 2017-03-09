import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase';

var config = {
	apiKey: "AIzaSyBFiVa7Qt-IzLpFTFpWGLYfcFE0TbNQwgc",
	databaseURL: "https://fcc-stockmarket-22a92.firebaseio.com"
};

firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
