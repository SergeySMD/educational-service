import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, setDoc } from "firebase/firestore"; 
import { signOut } from 'firebase/auth';
import { LogoutOutlined, ToolOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './styles.css';

function Topbar(props) {
  const { auth } = window;
  const user = useSelector(state => state.auth.user);

  const onClickLogout = () => {
    signOut(auth);
  }
  return (
    <div className="app-topbar">
      <div className='app-topbar__left'>

      </div>
      <div className='app-topbar__right'>
        {user && <div className='app-topbar__user'>
          <div className='app-topbar__user-name'>
            {user.isAdmin && <ToolOutlined />}
            <span>{user?.name} / {user?.group}</span>
          </div>
        </div>}
        <div className='app-topbar__logout'>
            <Button icon={<LogoutOutlined />} danger onClick={onClickLogout}>Выход</Button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
