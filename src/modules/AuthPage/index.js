import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserInfoForm from './components/UserInfoForm';
import { Tabs } from 'antd';
import * as ducks from './ducks';
import './styles.css';

function AuthPage(props) {
  const { isAdmin } = props;
  const { TabPane } = Tabs;
  return (
    <div className="auth-page">
        <Tabs defaultActiveKey="1" centered>
          <TabPane
            tab='Вход'
            key="1"
          >
            <div className='auth-page-form'>
              <UserInfoForm />
            </div>
          </TabPane>
          <TabPane
            tab='Регистрация'
            key="2"
          >
            <div className='auth-page-form'>
              <UserInfoForm registration/>
            </div>
          </TabPane>
        </Tabs>
    </div>
  );
}

export default AuthPage;
