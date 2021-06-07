import React, { useState, useEffect, useCallback } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";

import { GET_USER, BOOK_ADDED, ALL_BOOKS } from "./queries";

import Login from "./components/Login";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Recommended from "./components/Recommended";
import NewBook from "./components/NewBook";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");

  const client = useApolloClient();

  const getUser = useQuery(GET_USER, {
    pollInterval: 2000,
  });

  const setTokenCallback = useCallback((t) => {
    setToken(t);
    setPage("authors");
  }, []);

  const setUserCallback = useCallback((u) => {
    setUser(u);
  }, []);

  useEffect(() => {
    if (token && getUser.data) {
      setUserCallback(getUser.data.me);
    }
  }, [token, getUser.data, setUserCallback]);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((book) => book.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`New book added: ${subscriptionData.data.bookAdded.title}`);
      updateCacheWith(subscriptionData.data.bookAdded);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authenticationToken");
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => logout()}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
        {token ? (
          <button onClick={() => setPage("recommended")}>recommended</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
      </div>

      <Authors token={token} show={page === "authors"} />

      <Books show={page === "books"} />

      <Recommended show={page === "recommended"} user={user} />

      <NewBook show={page === "add"} updateCacheWith={updateCacheWith} />

      <Login setToken={setTokenCallback} show={page === "login"} />
    </div>
  );
};

export default App;
