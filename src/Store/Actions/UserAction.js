import axios from "axios";
export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_FAILURE";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const CREATE_USER = "CREATE_USER";
export const fetchUserDataAction = () => {
  return {
    type: FETCH_USER_DATA,
  };
};

export const createUserAction = (isSuccess) => {
  return {
    type: CREATE_USER,
    payload: isSuccess,
  };
};

export const fetchUserSuccessAction = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};
export const fetchUserFailureAction = (errMessages) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: errMessages,
  };
};

export const deleteUserAction = (id) => {
  return { type: DELETE_USER, payload: id };
};

export const updateUserAction = (userInfo) => {
  return {
    type: UPDATE_USER,
    payload: userInfo,
  };
};

export const fetchUsers = (pageNumber = 1) => {
  return (dispatch) => {
    dispatch(fetchUserDataAction);
    axios
      .get(`https://mysterious-anchorage-54512.herokuapp.com/users?pageNo=${pageNumber}`)
      .then((response) => {
        dispatch(
          fetchUserSuccessAction({
            data: response.data.data,
            count: response.data.count,
          })
        );
      })
      .catch((err) => {
        dispatch(fetchUserFailureAction(err.message));
      });
  };
};

export const createUser = (userInfo, history) => {
  const user = {
    name: userInfo.username,
    email: userInfo.email,
    role: userInfo.role,
    password: userInfo.password,
  };
  return (dispatch) => {
    dispatch(fetchUserDataAction);
    axios
      .post("https://mysterious-anchorage-54512.herokuapp.com/users/create-user", user)
      .then((response) => {
        dispatch(createUserAction(true));
      });
  };
};

export const updateUser = (userInfo) => {
  return (dispatch) => {
    dispatch(fetchUserDataAction);
    axios
      .patch(`https://mysterious-anchorage-54512.herokuapp.com/users/update-user`, userInfo)

      .then((response) => {
        dispatch(updateUserAction(userInfo));
      })
      .catch((err) => {
        dispatch(fetchUserFailureAction(err.message));
      });
  };
};

export const deleteUser = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserDataAction);
    axios
      .delete(`https://mysterious-anchorage-54512.herokuapp.com/users/delete-user/${userId}`)
      .then((response) => {
        dispatch(deleteUserAction(response.data._id));
      })
      .catch((err) => {
        dispatch(fetchUserFailureAction(err.message));
      });
  };
};
