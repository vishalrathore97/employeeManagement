import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  SAVE_USER_REQUEST,
  SAVE_USER_FAILURE,
  SAVE_USER_SUCCESS,
  EDIT_USER_REQUEST,
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  LOAD_SAVE_TRUE,
  LOAD_SAVE_FALSE,
  LOAD_EDIT_TRUE,
  LOAD_EDIT_FALSE,
} from "./userTypes";

const initialState = {
  loading: true,
  loadSave: false,
  loadDelete: false,
  loadEdit: false,
  users: [],
  error: "",
  errorSave: "",
  errorDelete: "",
  errorEdit: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: "" };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, users: [], error: action.payload };
    case DELETE_USER_REQUEST:
      const index = [...state.users].indexOf(action.payload);
      return {
        ...state,
        error: "",
        users: [
          ...state.users.slice(0, index),
          ...state.users.slice(index + 1),
        ],
      };
    case DELETE_USER_FAILURE:
      const idx = action.user.id - 1;
      return {
        ...state,
        error: action.error,
        users: [
          ...state.users.slice(0, idx),
          action.user,
          ...state.users.slice(idx),
        ],
      };
    case SAVE_USER_REQUEST:
      return { ...state, loadSave: true };
    case SAVE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        loadSave: false,
      };
    case SAVE_USER_FAILURE:
      return {
        ...state,
        loadSave: false,
        errorSave: action.payload,
      };
    case EDIT_USER_REQUEST:
      return { ...state, loadEdit: true };
    case EDIT_USER_SUCCESS:
      const data = [...state.users].find((u) => u.id === action.payload.id);
      const indx = [...state.users].indexOf(data);
      return {
        ...state,
        users: [
          ...state.users.slice(0, indx),
          action.payload,
          ...state.users.slice(indx + 1),
        ],
        loadEdit: false,
      };
    case EDIT_USER_FAILURE:
      return {
        ...state,
        loadEdit: false,
        errorEdit: action.payload,
      };
    case LOAD_SAVE_TRUE:
      return { ...state, loadSave: true };
    case LOAD_SAVE_FALSE:
      return { ...state, loadSave: false };
    case LOAD_EDIT_TRUE:
      return { ...state, loadEdit: true };
    case LOAD_EDIT_FALSE:
      return { ...state, loadEdit: false };
    default:
      return { ...state };
  }
};

export default userReducer;
