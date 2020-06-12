import {
  ADD_WORDS,
  SET_WORDS_LIST,
  LOADING_DATA
} from '../types';



const initialState = {
  wordsList: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) { 
    // case LOADING_DATA:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    case SET_WORDS_LIST:
      return {
        ...state,
        wordsList: action.payload,        
        loading: false
      }; 
    case ADD_WORDS:
      return  {
        ...state,
        wordsList: [action.payload, ...state.wordsList]
      };
    default:
      return state;
  }
}
