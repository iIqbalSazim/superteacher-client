export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const reset = () => ({
  type: "RESET",
});
