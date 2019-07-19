import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import './App.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './context/authContext';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/'
});

// Middle Ware Between the Front End and BackEnd.
const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return ({
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


ReactDOM.render(

  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
