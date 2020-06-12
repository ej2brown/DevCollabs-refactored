import { useEffect, useState } from "react"
import axios from "axios"

export default function usePublic() {
  const [publicGroups, setPublic] = useState({
    groups: [],
  })
  const [news, setNews] = useState([]);

  //gets all group names of a user. returns {array<[id:number ,name:string]>} data
  const fetchAllGroups = () => {
    axios
      .get(`http://localhost:3001/group/public`)
      .then(response => {
        setPublic({ ...publicGroups, groups: response.data })
      })
      .catch(e => e.stack)
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
    fetchAllGroups();
    fetchNews();
  }, [])

  return {
    publicGroups,
    fetchNews,
    news
  }
}
