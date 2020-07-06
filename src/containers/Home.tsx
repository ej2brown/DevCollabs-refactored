/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";

//hooks
import usePublic from "../components/hooks/usePublic";
import useApplicationData from "../components/hooks/useApplicationData";

//components
// import UserCard from "../components/UserCard";
import News from "../components/News";
import IndexGroupsList from "../components/IndexGroupsList";
import Github from "../components/GithubSearch";
import "./containers.css";

const Home = () => {
  const { news } = usePublic();

  const {
    subscriptions,
    fetchUserSubscriptions
  } = useApplicationData();

  // const userID = JSON.parse(localStorage.getItem('session') || '{}').id;
  const userID = 1;

  useEffect(() => {
    fetchUserSubscriptions(userID)
  }, []);


  return (
    <>
      <header>
        <h2>Home Page</h2>
      </header>
      <section>
        <IndexGroupsList subscriptions={subscriptions} />
        {/* <UserCard /> */}
        <News news={news} />
      </section>
    </>
  );
};

export default Home;
