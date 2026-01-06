import { combineReducers } from 'redux';
import formReducer from './formReducers';

// Об'єднання ред'юсерів
const rootReducer = combineReducers({
  form: formReducer,
});

export default rootReducer;
