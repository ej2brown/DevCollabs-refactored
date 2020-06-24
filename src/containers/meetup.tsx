/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";

//hooks
import usePublic from "../components/hooks/usePublic";
import useApplicationData from "../components/hooks/useApplicationData";

//components
// import UserCard from "../components/UserCard";
import GithubSearch from "../components/GithubSearch";
import Hackathon from "../components/Hackathon";

import "./containers.css";

const GithubSearchPage = () => {


  return (
    <>
      <header>
        <h2>GithubSearch Page</h2>
      </header>
      <section>
        <Hackathon />
        <GithubSearch />
      </section>
    </>
  );
};

export default GithubSearchPage;
