import React from "react";

//hooks
import usePublic from "../components/hooks/usePublic";
import useApplicationData from "../components/hooks/useApplicationData";

//components
// import UserCard from "../components/UserCard";
import News from "../components/News";
// import Github from "../components/Github";

import "./containers.css";

const Home = () => {
  const { news } = usePublic();

  const {
    subscriptions,
    fetchUserSubscriptions
  } = useApplicationData();
  return (
    <>
      <header>
        <h2>Home Page</h2>
      </header>
      <section>
        <News news={news} />
      </section>
    </>
  );
};

export default Home;
