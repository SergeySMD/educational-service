import {
  formReducer, moduleName, initForm, updateForm, removeKey,
} from './ducks';
import { getForm } from './selectors';

export default {
  reducer: formReducer,
  moduleName,
  initForm,
  updateForm,
  getForm,
  removeKey,
};
