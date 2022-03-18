import { makeActionCreator } from "../../utils/makeActionCreator";

export const moduleName = 'user';


export const SET_AUTH = `${moduleName}/SET_AUTH`;
export const SET_AUTH_DATA = `${moduleName}/SET_AUTH_DATA`;

export const setAuth = makeActionCreator(SET_AUTH, 'data')
export const setUserData = makeActionCreator(SET_AUTH_DATA, 'data')

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
      case SET_AUTH_DATA:
        return {
          ...state,
          auth: action.data
        }
      default:
          return state;
  }
};
