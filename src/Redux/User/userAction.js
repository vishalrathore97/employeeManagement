import axios from "axios";
import { toast } from "react-toastify";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  SAVE_USER_REQUEST,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  LOAD_SAVE_TRUE,
  LOAD_SAVE_FALSE,
  LOAD_EDIT_TRUE,
  LOAD_EDIT_FALSE,
} from "./userTypes";

//FETCH USERS
export const fetchUsersRequest = () => {
  return { type: FETCH_USERS_REQUEST };
};
export const fetchUsersSuccess = (data) => {
  return { type: FETCH_USERS_SUCCESS, payload: data };
};
export const fetchUsersFailure = (error) => {
  return { type: FETCH_USERS_FAILURE, payload: error };
};
//ASYNC FETCH USERS
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => dispatch(fetchUsersSuccess(res.data)))
      .catch((err) => {
        toast.error(err.message);
        dispatch(fetchUsersFailure(err.message));
      });
  };
};

//DELETE USER
export const deleteUserRequest = (user) => {
  return { type: DELETE_USER_REQUEST, payload: user };
};
export const deleteUserFailure = (error, user) => {
  return { type: DELETE_USER_FAILURE, error, user };
};
//ASYNC DELETE USER
export const deleteUser = (user) => {
  return (dispatch) => {
    dispatch(deleteUserRequest(user));
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
      .then((res)=> toast.success("Deleted Successfully") )
      .catch((err) => {
        toast.error(err.message);
        dispatch(deleteUserFailure(err.message, user));
      });
  };
};

//SAVE USER

export const loadSaveTrue = () => {
  return { type: LOAD_SAVE_TRUE };
};
export const loadSaveFalse = () => {
  return { type: LOAD_SAVE_FALSE };
};
export const saveUserRequest = () => {
  return { type: SAVE_USER_REQUEST };
};
export const saveUserSuccess = (data) => {
  return { type: SAVE_USER_SUCCESS, payload: data };
};
export const saveUserFailure = (error) => {
  return { type: SAVE_USER_FAILURE, payload: error };
};
//ASYNC SAVE USER
export const saveUser = (user) => {
  return (dispatch) => {
    dispatch(saveUserRequest());
    axios
      .post("https://jsonplaceholder.typicode.com/users", user)
      .then((res) => {
        toast.success("Saved Successfully");
        dispatch(saveUserSuccess(res.data));
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(saveUserFailure(err.message));
      });
  };
};

//EDIT USER
export const loadEditTrue = () => {
  return { type: LOAD_EDIT_TRUE };
};
export const loadEditFalse = () => {
  return { type: LOAD_EDIT_FALSE };
};
export const editUserRequest = () => {
  return { type: EDIT_USER_REQUEST };
};
export const editUserSuccess = (data) => {
  return { type: EDIT_USER_SUCCESS, payload: data };
};
export const editUserFailure = (error) => {
  return { type: EDIT_USER_FAILURE, payload: error };
};
//ASYNC EDIT USER
export const editUser = (user) => {
  return (dispatch) => {
    dispatch(editUserRequest());
    axios
      .patch(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
      .then((res) => {
        toast.success("Updated Successfully");
        dispatch(editUserSuccess(res.data));
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(editUserFailure(err.message));
      });
  };
};
