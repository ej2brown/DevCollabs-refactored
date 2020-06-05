import { useEffect, useState } from "react"
import axios from "axios"
import { User } from "../../interfaces"
import { useSelector, useDispatch } from "react-redux";
import { setGroup, setGroups } from "../groupListSlice"

export default function useApplicationData() {
  const dispatch = useDispatch();

  // const [state, setState] = useState<User>({
  //   group: 0,
  //   groups: [],
  //   posts: [],
  // })
  const [postCount, setPostCount] = useState(0);
  const [subscriptions, setSubscriptions] = useState([]);
  const [news, setNews] = useState([]);

  //get a users id from session json data. returns {id:number}
  const userId: number = JSON.parse(localStorage.getItem("session") || "{}").id

  //gets all group names of a user. returns {array<[id:number ,name:string]>} data
  const fetchGroups = () => {
    axios
      .get(`http://localhost:3001/group/u/${userId}`)
      .then(response => {
        axios
          .get(`http://localhost:3001/group/g/${response.data[0].id}`)
          .then(data => {
            dispatch(setGroups({
              posts: data.data,
              group: response.data[0].id,
              groups: response.data,
            }))
          })
          .catch(error => error.stack)
      })
      .catch(error => error.stack)
  }

  const fetchGroup = (groupId: number) => {
    axios
      .get(`http://localhost:3001/group/g/${groupId}`)
      .then(response => {
        dispatch(setGroup({ group: groupId, posts: response.data }))
      })
      .catch(error => error.stack)
  }

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
  }

  const fetchNews = () => {
    axios
      .get('http://hn.algolia.com/api/v1/search?tags=front_page')
      .then(res => {
        setNews(res.data.hits)
      })
      .catch(e => e.stack)
  };

  useEffect(() => {
    fetchGroups()
    fetchNews()
  }, [])

  return {
    fetchGroup,
    fetchGroups,
    fetchUserPosts,
    fetchUserSubscriptions,
    postCount,
    subscriptions,
    fetchNews,
    news
  }
}
