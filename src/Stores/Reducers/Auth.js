/* eslint-disable no-case-declarations */
const INITIAL_STATE = {
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_USER":
      const updatedUser = {
        ...state.user,
        email: action.payload.email,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        gender: action.payload.gender,
        phone_number: action.payload.phone_number,
      };
      return {
        ...state,
        user: updatedUser,
      };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
