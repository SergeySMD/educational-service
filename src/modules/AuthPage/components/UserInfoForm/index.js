import React, { useEffect, useState } from 'react';
import { Input, Button, notification } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, adminsUID, getErrorMessage } from '../../../../utils';
import { doc, setDoc } from "firebase/firestore"; 

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import './styles.css';

function UserInfoForm(props) {
  const { registration } = props;
  const { auth, firestore } = window;
  const dispatch = useDispatch();

  const [initialData, setInitialData] = useState()
  
  const addUserInfo = async (payload) => {
    await setDoc(doc(firestore, "users", payload.uid), payload);
  };

  const onSubmit = (data) => {
    const {email, password} = data;
    if (registration) {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        const user = userCredential.user;
        const payload = {
          uid: user.uid,
          name: data.student,
          group: data.group,
          isAdmin: adminsUID?.includes(user.uid)
        }
        addUserInfo(payload);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, '\n', errorMessage)
        notification.error({
          message: getErrorMessage(errorCode),
          placement: 'bottomRight',
          duration: 2,
        })
      });
    } else {
      signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        console.log('Auth success!');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, '\n', errorMessage)
        notification.error({
          message: getErrorMessage(errorCode),
          placement: 'bottomRight',
          duration: 2,
        })
      });
    }
  }

  const validate = (values) => {
    let isValid = true;
    const errors = {};
    if (registration) {
      if (!values.student) {
          errors.student = '???????????????????????? ????????'
          isValid = false;
      }
      if (!values.group) {
        errors.group = '???????????????????????? ????????'
        isValid = false;
      }
    }
    if (!values.email) {
      errors.email = '???????????????????????? ????????'
      isValid = false;
    }
    if (!values.password) {
      errors.password = '???????????????????????? ????????'
      isValid = false;
    }
    return { isValid, errors };
  };

  const {
    handleSubmit,
    handleInputChange,
    inputs,
    errors,
    updateFormHandle,
    reset,
  } = useForm({
    initialData,
    onSubmit: onSubmit,
    validate: validate,
    name: 'authStudent'
  });

  const onChangePassword = (e) => {
    updateFormHandle({data: {
      password: e.target.value
    }})
  }

  return (
    <div className="auth-student-info-form">
      <div className='auth-student-info-form__title'>
        {registration ? '?????????????????????? ???????????? ????????????????????????' : '???????? ?? ??????????????'}
      </div>
      {registration && <>
        <div className='auth-student-info-form__name'>
          <Input 
            name='student'
            placeholder='?????? ????????????????'
            value={inputs?.student}
            onChange={handleInputChange}
            status={!!errors.student ? 'error' : false}
          />
        </div>
        <div className='auth-student-info-form__group'>
          <Input 
            name='group'
            placeholder='????????????'
            value={inputs?.group}
            onChange={handleInputChange}
            status={!!errors.group ? 'error' : false}
          />
        </div>
      </>}
      <div className='auth-student-info-form__login'>
        <Input
          name='email'
          placeholder='E-mail'
          value={inputs?.email}
          onChange={handleInputChange}
          status={!!errors.email ? 'error' : false}
        />
      </div>
      <div className='auth-student-info-form__password'>
        <Input.Password 
          name='password'
          placeholder='????????????'
          value={inputs?.password}
          onChange={onChangePassword}
          status={!!errors.password ? 'error' : false}
        />
      </div>
      <Button onClick={handleSubmit} type='primary' icon={<LoginOutlined/>}> {registration ? '????????????????????????????????' : '??????????'} </Button>
    </div>
  );
}

export default UserInfoForm;
