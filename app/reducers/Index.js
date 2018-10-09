import { combineReducers } from 'redux';

import basicInformation from './BasicInformationReducers';
import user from './UserReducers';
import menus from './MenusReducers';

export default combineReducers({
  basicInformation,
  menus,
  user,
});
