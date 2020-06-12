import {
  TOGGLE_DRAWER,
} from '../types';

const initialState = {
  openDrawer: false,
};

export default function(state = initialState, action) {
  switch (action.type) {  
    case TOGGLE_DRAWER:
      return  {
        ...state,
        openDrawer: !state.openDrawer,
      };
    default:
      return state;
  }
}