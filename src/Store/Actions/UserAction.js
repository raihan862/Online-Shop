import axios from "axios";
export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_FAILURE";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const fetchUserDataAction = () => {
  return {
    type: FETCH_USER_DATA,
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
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(fetchUserDataAction);
    axios
      .get(`http://localhost:3000/users?pageNo=${pageNumber}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("user data ", response.data);
        dispatch(
          fetchUserSuccessAction({
            data: response.data.data,
            count: response.data.count,
          })
        );
      })
      .catch((err) => {
        dispatch(fetchUserFailureAction(err.messages));
      });
  };
};

export const updateUser = (userInfo) => {
  const token = localStorage.getItem("token");
  console.log("user info", userInfo);
  return (dispatch) => {
    dispatch(fetchUserDataAction);
    fetch(`http://localhost:3000/users/update-user`, {
      method: "PATCH",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateUserAction(userInfo));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(fetchUserFailureAction(err.messages));
      });
  };
};

export const deleteUser = (userId) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(fetchUserDataAction);
    axios
      .delete(`http://localhost:3000/users/delete-user/${userId}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(deleteUserAction(response.data._id));
      })
      .catch((err) => {
        dispatch(fetchUserFailureAction(err.messages));
      });
  };
};
