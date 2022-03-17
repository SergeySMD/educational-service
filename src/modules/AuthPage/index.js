import React, { useEffect, useState } from 'react';
import StudentInfoForm from './components/StudentInfoForm';
import './styles.css';

function AuthPage(props) {
  const { isAdmin } = props;
  return (
    <div className="auth-page">
      <div className='auth-page-form'>
        <StudentInfoForm />
      </div>
    </div>
  );
}

export default AuthPage;
