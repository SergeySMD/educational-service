import React, { useEffect, useState } from 'react';
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import AuthPage from './modules/AuthPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Switch>
          <Route exact path="/">
              <Redirect to="/auth" />
          </Route>
          <Route exact path="/auth">
              <AuthPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
