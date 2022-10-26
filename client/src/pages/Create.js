// Node Modules
import React from "react";
import { useQuery } from "@apollo/client";
// Utilities
import Auth from "../utils/auth";
import { QUERY_USERS } from "../utils/queries";

const Create = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  

  const renderUsername = () => {
    if (!Auth.loggedIn()) return null;
    return Auth.getProfile().data.username;
  };

  return (
    <main>
      <div>{renderUsername()}</div>
      <div></div>
      <div></div>
    </main>
  );
}

export default Create;