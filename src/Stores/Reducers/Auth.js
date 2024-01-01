const INITIAL_STATE = {
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
