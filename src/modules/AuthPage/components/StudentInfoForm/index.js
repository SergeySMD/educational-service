import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import './styles.css';
import useForm from '../../../../utils/useForm';

function StudentInfoForm(props) {
  const { isAdmin } = props;
  const [initialData, setInitialData] = useState({})

  const onSubmit = (data) => {
    console.log('submit',data);
  }
  const validate = (values) => {
    let isValid = true;
    const errors = {};
    if (!values.student) {
        errors.student = 'Обязательное поле'
        isValid = false;
    }
    if (!values.group) {
      errors.group = 'Обязательное поле'
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
  console.log('err', errors);

  return (
    <div className="auth-student-info-form">
      <div className='auth-student-info-form__title'>
        Вход в систему
      </div>
      <div className='auth-student-info-form__name'>
        <Input 
          name='student'
          placeholder='ФИО студента'
          value={inputs?.student}
          onChange={handleInputChange}
          status={!!errors.student ? 'error' : false}
        />
      </div>
      <div className='auth-student-info-form__group'>
        <Input 
          name='group'
          placeholder='Группа'
          value={inputs?.group}
          onChange={handleInputChange}
          status={!!errors.group ? 'error' : false}
        />
      </div>
      <Button onClick={handleSubmit} type='primary'> Продолжить </Button>
    </div>
  );
}

export default StudentInfoForm;
