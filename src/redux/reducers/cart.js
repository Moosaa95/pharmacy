import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i) => i.id === item.id);
    if (isItemExist) {
      return {
        ...state,
        cart: state.cart.map((i) => (i.id === isItemExist.id ? item : i)),
      };
    } else {
      return { ...state, cart: [...state.cart, item] };
    }
  },

  removeFromCart: (state, action) => {
    return {
        ...state, 
        cart: state.cart.filter((i) => i.id !== action.payload)
    }
  }
});

// // export const cartReducer = createReducer(initialState, (builder) => {
// //     builder.addCase("addToCart", (state, action) => {
// //       const item = action.payload;
// //       const isItemExist = state.cart.find((i) => i.id === item.id);

// //       if (isItemExist) {
// //         state.cart = state.cart.map((i) => (i.id === isItemExist.id ? item : i));
// //       } else {
// //         state.cart.push(item);
// //       }

// //       // Update local storage
// //       localStorage.setItem("cartItem", JSON.stringify(state.cart));
// //     });
// //   });

// cartReducer.js
// import { createReducer } from "@reduxjs/toolkit";
// // import produce from "immer";

// const initialState = {
//   cart: localStorage.getItem("cartItem")
//     ? JSON.parse(localStorage.getItem("cartItem"))
//     : [],
// };

// export const cartReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase("addToCart", (state, action) => {
//       const item = action.payload;
//       const isItemExist = state.cart.find((i) => i.id === item.id);

//       if (isItemExist) {
//         state.cart = state.cart.map((i) => (i.id === isItemExist.id ? item : i));
//       } else {
//         state.cart.push(item);
//       }

//       // Update local storage
//       localStorage.setItem("cartItem", JSON.stringify(state.cart));
//     })
//     .addCase("removeFromCart", (state, action) => {
//       const itemId = action.payload;
//       state.cart = state.cart.filter((item) => item.id !== itemId);

//       // Update local storage
//       localStorage.setItem("cartItem", JSON.stringify(state.cart));
//     });
// });

