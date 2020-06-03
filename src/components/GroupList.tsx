// import React, { useState } from "react";
// import axios from "axios"

export function GroupList() {
//     const dispatch = useDispatch();

//     const setGroup = (groupId: number) => {
//         axios
//           .get(`https://localhost:3001/${groupId}`)
//           .then(response => {
//             dispatch(setGroup({ ...state, group: groupId, posts: response.data })
//           })
//           .catch(error => error.stack)
//       }


//       const fetchGroups = () => {
//         axios
//           .get(`https://dev-collabs-backend.herokuapp.com/group/u/${userId}`)
//           .then(response => {
//             axios
//             .get(`https://dev-collabs-backend.herokuapp.com/group/g/${response.data[0].id}`)
//             .then(data => {
//               setState({ ...state,
//                  posts: data.data,
//                  group: response.data[0].id,
//                  groups: response.data,
//               })
//             })
//             .catch(error => error.stack)
//           })
//           .catch(error => error.stack)
//       }
    

//   return <div>test</div>;
}
exports.GroupList = GroupList;