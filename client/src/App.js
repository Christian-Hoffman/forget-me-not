import React from 'react';
import { MantineProvider } from '@mantine/core';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Create from './pages/Create';
import Header from './components/Header';
import Footer from './components/Footer';
import UserList from "./components/UserList"

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: 'dark',
      colors: {
        // override dark colors to change them for all components
        dark: [
          '#d5d7e0',
          '#acaebf',
          '#8c8fa3',
          '#666980',
          '#4d4f66',
          '#34354a',
          '#2b2c3d',
          '#1d1e30',
          '#0c0d21',
          '#01010a',
        ],
      },
    }}
  >
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/:username" element={<UserList />} />
          </Routes>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
    </MantineProvider>
  );
}

export default App;
