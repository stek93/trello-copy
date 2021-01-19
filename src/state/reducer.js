import { combineReducers } from 'redux';

import members from './members/reducer';
import boards from './boards/reducer';

export default combineReducers({ members, boards });
