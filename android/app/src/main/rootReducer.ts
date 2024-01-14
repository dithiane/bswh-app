import { combineReducers } from 'redux';
import usersReducer from './reducers/usersReducer';
import albumsReducer from './reducers/albumsReducer';
import photosReducer from './reducers/photosReducer';

export interface RootState {
  users: typeof usersReducer;
  albums: typeof albumsReducer;
  photos: typeof photosReducer;
}

const rootReducer = combineReducers<RootState>({
  users: usersReducer,
  albums: albumsReducer,
  photos: photosReducer
});

export default rootReducer;
