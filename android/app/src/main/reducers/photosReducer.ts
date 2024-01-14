import {
    FETCH_PHOTOS_REQUEST,
    FETCH_PHOTOS_SUCCESS,
    FETCH_PHOTOS_FAILURE
} from '../types/types';

export interface Photo {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface PhotosState {
    loading: boolean;
    photos: Photo[];
    error: string | null;
}

export const initialState: PhotosState = {
    loading: false,
    photos: [],
    error: null
};

export const photosReducer = (state: PhotosState = initialState, action: any) => {
    switch (action.type) {
        case FETCH_PHOTOS_REQUEST:
            return { ...state, loading: true };
        case FETCH_PHOTOS_SUCCESS:
            return { ...state, loading: false, photos: action.payload };
        case FETCH_PHOTOS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default photosReducer;