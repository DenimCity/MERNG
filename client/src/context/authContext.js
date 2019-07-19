import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';


const JWT_TOKEN = 'jwtToken';
const INITIAL_STATE = {
  user: null
};

if (localStorage.getItem(JWT_TOKEN)) {
  const decodeToken = jwtDecode(localStorage.getItem(JWT_TOKEN));
  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(JWT_TOKEN);
  } else {
    INITIAL_STATE.user = decodeToken;
  }
}

const authContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  function login (userData) {
    localStorage.setItem(JWT_TOKEN, userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem(JWT_TOKEN);
    dispatch({
      type: 'LOGOUT',
    });
  }
  return (
    <authContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { authContext, AuthProvider };
