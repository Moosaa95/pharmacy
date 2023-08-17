import {configureStore}  from "@reduxjs/toolkit"
import { userReducer } from "./reducers/user"
import { cartReducer } from "./reducers/cart"
import { wishlistReducer } from "./reducers/wishlist"

const Store  = configureStore({
    reducer: {
        
        user: userReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
    }
    
})


export default Store