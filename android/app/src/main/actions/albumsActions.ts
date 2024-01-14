import axios from 'axios';
import {
  FETCH_ALBUMS_REQUEST,
  FETCH_ALBUMS_SUCCESS,
  FETCH_ALBUMS_FAILURE
} from '../types/types';

/**
 * Fetches albums for a specific user.
 *
 * @param {number} userId - The ID of the user whose albums will be fetched.
 * @return {Promise<void>} A promise that resolves when the albums are fetched.
 */

export const fetchAlbums = (userId: number) => {
  return async (dispatch: any) => {
    dispatch({ type: FETCH_ALBUMS_REQUEST });

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
      );
      dispatch({
        type: FETCH_ALBUMS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALBUMS_FAILURE,
        payload: (error as Error).message
      });
    }
  };
};
