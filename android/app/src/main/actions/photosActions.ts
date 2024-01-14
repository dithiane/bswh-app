import axios from 'axios';
import {
    FETCH_PHOTOS_REQUEST,
    FETCH_PHOTOS_SUCCESS,
    FETCH_PHOTOS_FAILURE
} from '../types/types';

/**
 * Fetches photos from the server based on the provided album ID.
 *
 * @param {number | null} albumId - The ID of the album to fetch photos from. If null, fetches all photos.
 * @return {Promise<void>} A Promise that resolves once the photos have been fetched.
 */

export const fetchPhotos = (albumId: number | null) => {
    return async (dispatch: any) => {
        dispatch({ type: FETCH_PHOTOS_REQUEST });
        const expand = albumId ? `?albumId=${albumId}` : '';

        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/photos${expand}`
            );
            dispatch({
                type: FETCH_PHOTOS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: FETCH_PHOTOS_FAILURE,
                payload: (error as Error).message
            });
        }
    };
};