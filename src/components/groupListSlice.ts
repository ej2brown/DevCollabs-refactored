import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import fetch from 'isomorphic-fetch'

interface GroupListState {
    groups: any;
    group: any;
}
const initialState: GroupListState = {
    groups: [],
    group: {},
};

export const GroupListSlice = createSlice({
    name: "groupList",
    initialState,
    reducers: {
        //     setGroup: (state, action: PayloadAction<number>) => {
        //         const { id, groupId } = action.payload

        //         ({ ...state, group: groupId, posts: action.payload })
        //     },
        //     retrieveGroups: (state, action: PayloadAction<number>) => {
        //         state.value += action.payload;
        // }
    },
});
exports.GroupListSlice = GroupListSlice;