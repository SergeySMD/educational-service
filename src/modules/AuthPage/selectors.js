import { moduleName } from './ducks';

const local = (state) => state[moduleName];

export const isAuth = (state) => local(state).isAuth;
export const userInfo = (state) => local(state).user;
