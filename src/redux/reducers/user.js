// import {createReducer}  from "@reduxjs/toolkit"


// const initialState = {
//     isAuthenticated: false
// }


// export const userReducer = createReducer(initialState, {
//     LoadUser: (state) => {
//         state.loading = true
//     },
//     LoadUserSuccess: (state, action) => {
//         state.isAuthenticated = true
//         state.loading = false
//         state.user = action.payload
//     }
// })

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false, // Add a loading state to track loading status
  user: null, // Initialize user to null
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUser", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFailure", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
});
