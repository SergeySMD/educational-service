import React, { useEffect, useState } from 'react';
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import AuthPage from './modules/AuthPage';
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setUserData } from './modules/AuthPage/ducks';
import { doc, getDoc } from "firebase/firestore"; 
import Topbar from './components/Topbar';
import { Spin } from 'antd';

function App() {
  const {auth, firestore} = window;
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth)
  const [user, setUser] = useState();
  const [isFetching, setIsFetching] = useState(true);

  onAuthStateChanged(auth, (user)=>{
      setUser(user);
  })
  
  useEffect(()=>{
    if (!!user || user === null) {
      setIsFetching(false);
    }
    if (user) {
      getDoc(doc(firestore, 'users', user.uid))?.then(res => {
        dispatch(setUserData(res.data()))
        dispatch(setAuth(true))
      })
    } else {
      dispatch(setUserData(null))
      dispatch(setAuth(false))
    }
  },[user])

  return (
    <div className="App">
      {isAuth && <Topbar />}
      <div className="app-container">
        {isFetching ? <Spin/> :
        <Switch>
          <Route exact path="/">
              <Redirect to={isAuth ? "/home" : "/auth"} />
          </Route>
          <Route exact path="/auth">
              {isAuth && <Redirect to="/home" />}
              <AuthPage />
          </Route>
          <Route exact path="/home">
              {!isAuth && <Redirect to="/auth" />}
              test
          </Route>
        </Switch>}
      </div>
    </div>
  );
}

export default App;
