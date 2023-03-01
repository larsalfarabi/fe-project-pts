const intialState = {
  name: "",
  username: "",
  id_outlet: "",
  role: "",
  isAuth: false,
};

export const authProcess = (state = intialState, action) => {
  if (action.type === "login") {
    return {
      ...state,
      name: action.name,
      username: action.username,
      id_outlet: action.id_outlet,
      role: action.role,
      isAuth: action.isAuth,
    };
  }

  return state;
};
