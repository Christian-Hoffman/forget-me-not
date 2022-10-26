// Node Modules
import React from "react";
import { useQuery } from "@apollo/client";
// Utilities
import Auth from "../utils/auth";
import { QUERY_USERS } from "../utils/queries";
import Createlist from "../components/Createlist";


const Create = () => {
  return(
    <main>
      <div><Createlist /></div>
    </main>
  );
};

export default Create;
