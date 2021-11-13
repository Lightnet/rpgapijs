/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.apollographql.com/docs/react/get-started/

//import { useEffect, useState } from 'react';
//import { useSession } from "next-auth/react";
import client from "../lib/apolloclient"

import {
  //ApolloClient,
  //InMemoryCache,
  //ApolloProvider,
  //useQuery,
  gql
} from "@apollo/client";

export default function Page() {
  //const [data, setData] = useState(null);

  function btnTest(){
    client
      .query({
        query:gql`
        {
          getUser {
            id
          }
        }
        `
      })
      .then(result =>{ 
        console.log(result)
      });
  }
  // index page
  return (<>
    <button onClick={btnTest}> Test GQL </button>
  </>)
}











