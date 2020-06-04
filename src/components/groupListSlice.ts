import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import fetch from 'isomorphic-fetch'

interface GroupListState {
    groups: any;
    group: any;
    posts: {}
}
const initialState: GroupListState = {
    groups: [],
    group: {},
    posts: {}
};

export const GroupListSlice = createSlice({
    name: "groupList",
    initialState,
    reducers: {
        setGroup: (state, action: PayloadAction<any>) => {
            // const { id, groupId } = action.payload
            state.group = action.payload 
            state.posts = action.payload 
                // ({ ...state, group: groupId, posts: action.payload })
        },
        setGroups: (state, action: PayloadAction<any>) => {
            state.groups = action.payload;
        }
    },
});
exports.GroupListSlice = GroupListSlice;


export const { setGroup, setGroups } = GroupListSlice.actions;

export default GroupListSlice.reducer;