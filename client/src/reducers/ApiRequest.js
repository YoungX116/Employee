// the number of items on each page
let limit = 15;
// the field to be retrieved by getCurrent and getNextPage
let select =
  "name title gender startDate officePhone cellPhone sms email manager directReports";

const initState = {
  isFetching: false,
  employees: [],
  manager: [],
  subordinates: [],
  selected: {
    avatar: "",
    name: "",
    title: "",
    gender: "",
    startDate: "",
    officePhone: "",
    cellPhone: "",
    sms: "",
    email: "",
    manager: ""
  },
  pagination: {
    totalDocs: 0,
    totalPages: 1,
    currentPage: 1
  },
  currentPage: {
    select,
    limit,
    sort: {},
    populate: [
      {
        path: "manager",
        select: "name"
      },
      {
        path: "directReports.report"
      }
    ]
  },
  nextPage: {
    select,
    limit,
    page: 1,
    sort: {},
    populate: [
      {
        path: "manager",
        select: "name"
      },
      {
        path: "directReports.report"
      }
    ]
  },
  query: {},
  err: null
};

const apiRequest = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isFetching: true
      };

    case "FETCH_FAIL":
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        isFetching: false,
        employees: action.data,
        err: null
      };

    case "FETCH_ONE_SUCCESS":
      return {
        ...state,
        isFetching: false,
        selected: action.data,
        err: null
      };

    case "FETCH_CURRENT_SUCCESS":
      let totalPages = Math.ceil(Math.max(action.data.totalDocs, 1) / limit);
      return {
        ...state,
        isFetching: false,
        employees: action.data.docs,
        manager:
          state.manager.length > 0
            ? action.data.docs.filter(record => {
                return record._id === state.manager[0]._id;
              })
            : [],
        subordinates: action.data.docs.filter(doc => {
          return state.subordinates.find(record => doc._id === record._id);
        }),
        pagination: {
          ...state.pagination,
          totalDocs: action.data.totalDocs,
          totalPages
        },
        currentPage: {
          ...state.currentPage,
          limit:
            // limit *
            // Math.min(
            //   state.pagination.currentPage,
            //   state.nextPage.page,
            //   totalPages
            // )
            limit * Math.min(state.pagination.currentPage, totalPages)
        },
        nextPage: {
          ...state.nextPage,
          page: Math.min(state.pagination.currentPage + 1, totalPages)
        },
        err: null
      };

    case "FETCH_NEXT_PAGE_SUCCESS": {
      return {
        ...state,
        isFetching: false,
        employees: [...state.employees, ...action.data.docs],
        pagination: {
          totalDocs: action.data.totalDocs,
          totalPages: action.data.totalPages,
          currentPage: action.data.page
        },
        currentPage: {
          ...state.currentPage,
          limit: limit * action.data.page
        },
        nextPage: {
          ...state.nextPage,
          page: action.data.nextPage || state.nextPage.page
        },
        err: null
      };
    }

    case "FETCH_AVATAR_SUCCESS":
      return {
        ...state,
        isFetching: false,
        selected: {
          ...state.selected,
          avatar: `/avatar/${action.data.avatar}`
        },
        err: null
      };

    case "CLEAR":
      return {
        ...state,
        isFetching: false,
        employees: [],
        err: null
      };

    case "SORT":
      let sort = {
        [action.sortBy]:
          Object.keys(state.currentPage.sort)[0] === action.sortBy
            ? action.order * -1
            : 1
      };
      return {
        ...state,
        isFetching: false,
        currentPage: {
          ...state.currentPage,
          sort
        },
        nextPage: {
          ...state.nextPage,
          sort
        },
        err: null
      };

    case "SEARCH":
      const re = { $regex: action.queryString, $options: "i" };
      return {
        ...state,
        isFetching: false,
        query: {
          $or: [
            { name: re },
            { title: re },
            { gender: re },
            { startDate: re },
            { officePhone: re },
            { cellPhone: re },
            { sms: re },
            { email: re }
            // { manager: re }
          ]
        },
        err: null
      };

    case "RESET":
      return initState;

    case "SELECT_MANAGER":
      return {
        ...state,
        isFetching: false,
        manager: [action.data],
        // query: {
        //   _id: action.data._id
        // },
        err: null
      };

    case "SELECT_SUBORDINATES":
      return {
        ...state,
        isFetching: false,
        subordinates: action.data.directReports.map(record => {
          return record.report;
        }),
        err: null
      };

    default:
      return state;
  }
};

export default apiRequest;
