import { makeActionCreator } from "../../utils/makeActionCreator";

export const moduleName = 'auth';


export const SET_AUTH = `${moduleName}/SET_AUTH`;
export const SET_USER_DATA = `${moduleName}/SET_USER_DATA`;

export const setAuth = makeActionCreator(SET_AUTH, 'data')
export const setUserData = makeActionCreator(SET_USER_DATA, 'data')

const initState = {
  isAuth: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
      case SET_AUTH: 
        return {
          ...state,
          isAuth: action.data
        }
      case SET_USER_DATA:
        return {
          ...state,
          user: action.data
        }
      default:
          return state;
  }
};
