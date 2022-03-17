import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormModule from './Form';

const { initForm, updateForm } = FormModule;
/**
 * @function.Хук для работы с формами
 * @param {object} initialData - Начальные данные для формы by name inputs {name: '', email: ''}.
 * @param {function} onSubmit - onSubmit: (data) => () // данные формы.
 * @param {function} validate - Для валидации данных формы.
 * @param {function} validate.isValid - Прошла валидация или нет.
 * @param {function} validate.errors - Ошибки валидации для каждого инпута by name inputs.
 * @param {function} customHandleInputChange - коллбек, вызывается при изменении инпута(radio, number, textarea).
 * @param {function} customOnChangeSelect - Объект для оповещения о результате запроса.
 * 
 * @param {function} customOnChange - коллбек, вызывается при изменении инпута(checkbox)
 * @param {function} customOnChangeSelect - коллбек, вызывается при изменении инпута(select)
 * @param {string} name - Название формы .
 * 
 * @return {function} handleSubmit  Сабмит для формы.
 * @return {object} inputs Объект данных с инпутами формы.
 * @return {function} handleInputChange метод для изменения значения всех инпутов кроме селекта(onChange)
 * @return {function} onChangeSelect  метод для изменения значения селекта
 * @return {boolean} isSubmit был ли нажат сабмит
 * @return {object} errors ошибки валидации
 * @return {function} updateFormHandle обновление полей формы.
 * @return {function} reset сброс формы на начальные значения.
 * @return {function} resetErrors сброс ошибок валидации {}
 * @return {function} clear очистка формы {}
 * 
 * 
 */
export default function useForm(props) {
  const {
    initialData,
    onSubmit,
    validate,
    customOnChange,
    name,
    customOnChangeSelect,
    customHandleInputChange,
  } = props;

  const [errs, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initForm({ data: initialData || {}, name }));
  }, [initialData]);

  const inputs = useSelector((state) => state.form[name]);

  const handleSubmit = (event) => {
    setIsSubmit(true);
    if (event) {
      event.preventDefault();
    }
    const { isValid, errors } = validate ? validate(inputs) : { isValid: true };
    if (isValid) {
      setErrors({});
      onSubmit(inputs, event);
    } else {
      setErrors(errors);
    }
  };
  const handleInputChange = (e, payload) => {
    const {
      type,
      name: eventName,
      value,
      checked,
      id,
    } = e.target;

    const data = value;

    if (type === 'file') {
      const file = e.target?.files?.[0];
      dispatch(updateForm({ data: { [eventName]: file }, name }));
    }
    
    if (type === 'radio') {
      dispatch(updateForm({ data: { [eventName]: payload || id }, name }));
      if (customHandleInputChange) {
        customHandleInputChange({ name: eventName, data: id });
      }
    }

    if (['text', 'email', 'tel'].includes(type)) {
      e?.persist?.();
      if (value) {
        setErrors({
          ...errs,
          [eventName]: '',
        });
      }
      dispatch(updateForm({ data: { [eventName]: data }, name }));
    }

    if (type === 'checkbox') {
      let payload = { [eventName || id]: checked };
      if (customOnChange) {
        payload = customOnChange({
          name: eventName || id, type, checked, inputs,
        });
      }
      dispatch(updateForm({ data: payload, name }));
    }

    if (type === 'number') {
      dispatch(updateForm({ data: { [eventName]: data }, name }));
      if (customHandleInputChange) {
        customHandleInputChange({ name: eventName, data });
      }
    }

    if (type === 'textarea') {
      dispatch(updateForm({ data: { [eventName]: data }, name }));
      if (customHandleInputChange) {
        customHandleInputChange({ name: eventName, data });
      }
    }
  };

  const updateFormHandle = ({ data }) => {
    dispatch(updateForm({ data, name }));
  };

  const onChangeSelect = ({ name: eventName, data }) => {
    dispatch(updateForm({ data: { [eventName]: data }, name }));
    if (customOnChangeSelect) {
      customOnChangeSelect({ name: eventName, data });
    }
  };

  const reset = () => {
    dispatch(updateForm({ data: initialData, name }));
  };

  const resetErrors = () => {
    setErrors({});
  };

  const clear = () => {
    dispatch(updateForm({ data: {}, name }));
  };

  return {
    handleSubmit,
    onChangeSelect,
    handleInputChange,
    inputs: inputs || {},
    isSubmit,
    errors: errs,
    updateFormHandle,
    reset,
    resetErrors,
    clear,
  };
}
