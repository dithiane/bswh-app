import { Dispatch } from 'redux';
import axios from 'axios';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from '../types/types';


/**
 * Fetches users from the API.
 *
 * @param {Dispatch} dispatch - The dispatch function from Redux.
 * @return {Promise<void>} A promise that resolves when the users are fetched.
 */
export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: (error as Error).message,
      });
    }
  };
};