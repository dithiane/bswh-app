import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from '../types/types';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UsersState {
  loading: boolean;
  users: User[];
  error: string | null;
}

export const initialState: UsersState = {
  loading: false,
  users: [],
  error: null
};

export const usersReducer = (state: UsersState = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
