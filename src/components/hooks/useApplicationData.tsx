import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../interfaces";

export default function useApplicationData() {
  const [state, setState] = useState<User>({
    group: 0,
    groups: [],
    posts: [],
  });
  const [postCount, setPostCount] = useState(0);
  const [subscriptions, setSubscriptions] = useState([]);

  //get a users id from session json data. returns {id:number}
  const userId: number = JSON.parse(localStorage.getItem("session") || "{}").id;

  //gets all group names of a user. returns {array<[id:number ,name:string]>} data
  const fetchGroups = () => {
    axios
      .get(`http://localhost:3001/group/u/${userId}`)
      .then(response => {
        axios
          .get(`http://localhost:3001/group/g/${response.data[0].id}`)
          .then(data => {
            setState({
              ...state,
              posts: data.data,
              group: response.data[0].id,
              groups: response.data,
            });
          })
          .catch(error => error.stack);
      })
      .catch(error => error.stack);
  };

  const setGroup = (groupId: number) => {
    axios
      .get(`http://localhost:3001/group/g/${groupId}`)
      .then(response => {
        setState({ ...state, group: groupId, posts: response.data });
      })
      .catch(error => error.stack);
  };

  const fetchUserPosts = (userID: number) => {
    axios
      .get(`http://localhost:3001/profile/${userID}`)
      .then(response => setPostCount(response.data.totalPosts.count))
      .catch(e => e.stack);
  };

  const fetchUserSubscriptions = (userID: number) => {
    axios
      .get(`http://localhost:3001/profile/${userID}`)
      .then(response => setSubscriptions(response.data.userSubscriptions))
      .catch(e => e.stack);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return {
    state,
    setGroup,
    fetchGroups,
    fetchUserPosts,
    fetchUserSubscriptions,
    postCount,
    subscriptions,
  };
}
