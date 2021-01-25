import { combineReducers } from 'redux';

import members from './members/reducer';
import boards from './boards/reducer';
import cards from './cards/reducer';

export default combineReducers({ members, boards, cards });
