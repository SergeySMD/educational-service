import { makeActionCreator } from '../../makeActionCreator';
import { deepCopy } from '../../deepCopy';

export const moduleName = 'form'; // один на уровне модуля

export const INIT_FORM = 'INIT_FORM';
export const UPDATE_FORM = 'UPDATE_FORM';
export const REMOVE_KEY = 'REMOVE_KEY';

export const initForm = makeActionCreator(INIT_FORM, 'payload');
export const updateForm = makeActionCreator(UPDATE_FORM, 'payload');
export const removeKey = makeActionCreator(REMOVE_KEY, 'payload');

const initState = {};

export const formReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_FORM:
      return {
        ...state,
        [action.payload.name]: action.payload.data,
      };
    case REMOVE_KEY: {
      const form = deepCopy(state[action.payload.name]);
      const keys = action.payload.data.split('.');
      keys.reduce((acc, curr, index) => {
        if (index === keys.length - 1) {
          delete acc[curr];
          return acc;
        }
        return acc[curr];
      }, form);
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          ...form,
        },
      };
    }
    case UPDATE_FORM: {
      const data = {};
      const form = state[action.payload.name];
      Object.keys(action.payload.data).forEach((key) => {
        const keys = key.split('.');
        keys.reduce((acc, curr, index) => {
          if (index === keys.length - 1) {
            return acc[curr] = action.payload.data[key];
          }
          return acc[curr] = {
            ...form[curr],
          };
        }, data);
      });
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          ...data,
        },
      };
    }
    default:
      return state;
  }
};
