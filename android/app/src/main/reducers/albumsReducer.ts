import {
  FETCH_ALBUMS_REQUEST,
  FETCH_ALBUMS_SUCCESS,
  FETCH_ALBUMS_FAILURE
} from '../types/types';

export interface Album {
  id: number;
  albumId: number;
  userId: number;
  title: string;
}

export interface AlbumsState {
  loading: boolean;
  albums: Album[];
  error: string | null;
}

const initialState: AlbumsState = {
  loading: false,
  albums: [],
  error: null
};

export const albumsReducer = (state: AlbumsState = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ALBUMS_REQUEST:
      return { ...state, loading: true };
    case FETCH_ALBUMS_SUCCESS:
      return { ...state, loading: false, albums: action.payload };
    case FETCH_ALBUMS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default albumsReducer;
