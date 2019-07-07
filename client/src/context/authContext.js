import React, { createContext , useReducer} from 'react'


const authContext = createContext({
      user: null,
      login: (userData) => {},
      logout: () => {}
})

function authReducer(state, action) {
      switch(action.type) {
            case 'LOGIN':
                  return {
                        ...state,
                        user: action.payload
                  }
            case 'LOGOUT': 
            return {
                  ...state, 
                  user: null
            }
            default:
                  return state
      }
}

function AuthProvider(props){

      const INITIAL_STATE = {
            user: null 
      }
      const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

      function login (userData) {
            dispatch({
                  type: 'LOGIN',
                  payload: userData
            })
      }

      function logout() {
            dispatch({
                  type: 'LOGOUT',
            })
      }
      return (
            <authContext.Provider value={{ user: state.user , login, logout}}
                  {...props}
            />
      )

}

export { authContext, AuthProvider}