import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyB5x6ik66EHLTTtIl0JDG6klNMp6ojwSHQ",
  authDomain: "educational-service.firebaseapp.com",
  projectId: "educational-service",
  storageBucket: "educational-service.appspot.com",
  messagingSenderId: "76220704117",
  appId: "1:76220704117:web:38fabdd8c05cc2b1891f3c",
  measurementId: "G-J5T1N4L56Q"
});

const auth = getAuth(app);
const firestore = getFirestore(app);
window.auth = auth;
window.firestore = firestore;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
