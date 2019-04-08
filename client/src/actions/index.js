import axios from "axios";

export const requestStart = () => {
  console.log("request start");
  return {
    type: "FETCH_START"
  };
};

export const requestSuccess = response => {
  console.log("request success", response.data);
  return {
    type: "FETCH_SUCCESS",
    data: response.data
  };
};

export const requestOneSuccess = response => {
  console.log("request one success", response.data);
  return {
    type: "FETCH_ONE_SUCCESS",
    data: response.data
  };
};

export const requestCurrentSuccess = response => {
  console.log("request current employees success", response.data);
  return {
    type: "FETCH_CURRENT_SUCCESS",
    data: response.data
  };
};

export const requestNextPageSuccess = response => {
  console.log("request next page success", response.data);
  return {
    type: "FETCH_NEXT_PAGE_SUCCESS",
    data: response.data
  };
};

export const requestAvatarSuccess = response => {
  console.log("request avatar success", response.data);
  return {
    type: "FETCH_AVATAR_SUCCESS",
    data: response.data
  };
};

export const requestFail = error => {
  console.log("request fail");
  return {
    type: "FETCH_FAIL",
    error
  };
};

// clear data when Homepage component unmount
export const clear = () => {
  console.log("clear employees data");
  return {
    type: "CLEAR"
  };
};

// get all the employees from database
// GET: http://localhost:8888/api/getall
export const getAll = () => {
  console.log("get all employees");
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .get("/api/getall")
      .then(response => {
        dispatch(requestSuccess(response));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

// get a employee by _id
// GET: http://localhost:8888/api/getone/:_id
export const getOne = _id => {
  console.log("get employee by ", _id);
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .get(`/api/getone/${_id}`)
      .then(response => {
        dispatch(requestOneSuccess(response));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

// get current employees from database
// POST: http://localhost:8888/api/getcurrent
export const getCurrent = params => {
  console.log("get current employees");
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .post("/api/getcurrent", params)
      .then(response => {
        dispatch(requestCurrentSuccess(response));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

// get next page from database
// POST: http://localhost:8888/api/getnextpage
export const getNextPage = params => {
  console.log("get next page");
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .post("/api/getnextpage", params)
      .then(response => {
        dispatch(requestNextPageSuccess(response));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

// get avatar from database
// GET: http://localhost:8888/api/getavatar/:_id
export const getAvatar = _id => {
  console.log("get avatar by ", _id);
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .get(`/api/getavatar/${_id}`)
      .then(response => {
        dispatch(requestAvatarSuccess(response));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

// insert a new employee
// POST: http://localhost:8888/api/insertone
export const insertOne = (employee, params, history) => {
  console.log("insert new employee");
  return (dispatch, store) => {
    dispatch(requestStart());

    axios
      .post("/api/insertone", employee)
      .then(response => {
        console.log("response", response);
        if (response.data.manager) {
          console.log("update subordinate!");
          axios.put(`/api/updatesubordinate/${response.data.manager}`, {
            id: response.data._id
          });
        }
      })
      .then(() => {
        axios
          .post("/api/getcurrent", params)
          .then(response => {
            dispatch(requestCurrentSuccess(response));
          })
          .then(() => {
            console.log("insert success");
            history.goBack();
          })
          .catch(err => {
            dispatch(requestFail(err));
          });
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

// update a employee by _id
// PUT: http://localhost:8888/api/updateone/:_id
export const updateOne = (_id, employee, params, history) => {
  console.log("update employee by", _id);
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .put(`/api/updateone/${_id}`, employee)
      .then(() => {
        axios
          .post("/api/getcurrent", params)
          .then(response => {
            dispatch(requestCurrentSuccess(response));
          })
          .then(() => {
            console.log("update success");
            history.goBack();
          })
          .catch(err => {
            dispatch(requestFail(err));
          });
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

// delete employee by _id
// DELETE: http://localhost:8888/api/deleteone/:_id
export const deleteOne = (_id, params) => {
  console.log("delete employee by", _id);
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .delete(`/api/deleteone/${_id}`)
      .then(() => {
        dispatch(getCurrent(params));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

// delete avatar
// DELETE: http://localhost:8888/api/deleteavatar/:avatar
export const deleteAvatar = avatar => {
  console.log("delete avatar by", avatar);
  return (dispatch, store) => {
    dispatch(requestStart());
    axios.delete(`/api/deleteavatar/${avatar}`).catch(err => {
      dispatch(requestFail(err));
    });
  };
};

// sort the employee list
export const sort = (sortBy, order) => {
  console.log("sort employees by", sortBy);
  return (dispatch, getState) => {
    console.log("sortBy", sortBy, "order", order);
    dispatch({
      type: "SORT",
      sortBy,
      order
    });

    const query = getState().apiRequest.query;
    const options = getState().apiRequest.currentPage;

    dispatch(getCurrent({ query, options }));
  };
};

// search in the employee list
export const search = queryString => {
  console.log("search employees by", queryString);
  return (dispatch, getState) => {
    console.log("search", queryString);
    dispatch({
      type: "SEARCH",
      queryString
    });

    const query = getState().apiRequest.query;
    const options = getState().apiRequest.currentPage;

    dispatch(getCurrent({ query, options }));
  };
};

// reset filter in the employee list
export const reset = () => {
  console.log("reset filter");
  return (dispatch, getState) => {
    dispatch({
      type: "RESET"
    });

    const query = getState().apiRequest.query;
    const options = getState().apiRequest.currentPage;

    dispatch(getCurrent({ query, options }));
  };
};

// select the manager of an employee
export const selectManager = (_id, history) => {
  console.log("select manager by", _id);
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .get(`/api/getone/${_id}`)
      .then(response => {
        dispatch({
          type: "SELECT_MANAGER",
          data: response.data
        });
      })
      .then(() => {
        console.log("select success");
        history.push("/manager");
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

// select subordinates of an employee
export const selectSubordinates = (_id, history) => {
  console.log("select subordinates by", _id);
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .get(`/api/getone/${_id}`)
      .then(response => {
        dispatch({
          type: "SELECT_SUBORDINATES",
          data: response.data
        });
      })
      .then(() => {
        console.log("select success");
        history.push("/subordinate");
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};
