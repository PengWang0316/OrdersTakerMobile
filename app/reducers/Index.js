import { combineReducers } from 'redux';

import basicInformation from './BasicInformationReducers';
import user from './UserReducers';

export default combineReducers({
  basicInformation,
  user,
});
