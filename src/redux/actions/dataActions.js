import {LOADING_UI,SET_ERRORS, ADD_WORDS, SET_WORDS_LIST } from '../types';




//// Get all wordsList
export const getWordsList = (wordsList) => (dispatch) => {
  // dispatch({ type: LOADING_UI });
  dispatch({
            type: SET_WORDS_LIST,
            payload: wordsList,
          });
}
// Add word
export const addNewWord = (newWord) => (dispatch) => {
  // dispatch({ type: LOADING_UI });
  dispatch({
          type: ADD_WORDS,
          payload: newWord
        });

  // axios
  //   .post('/scream', newWord)
  //   .then((res) => {
  //     dispatch({
  //       type: ADD_WORDS,
  //       payload: res.data
  //     });
  //     dispatch(clearErrors());
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: SET_ERRORS,
  //       payload: err.response.data
  //     });
  //   });
};







