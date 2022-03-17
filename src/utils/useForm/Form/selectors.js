import { moduleName } from './ducks';

const local = (state) => state[moduleName];

export const getForm = (state) => local(state);
