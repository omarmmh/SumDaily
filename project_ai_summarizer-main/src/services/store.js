// Get tools from the toolkit
import { configureStore } from "@reduxjs/toolkit";

// Grab the article connection setup we made
import { articleApi } from "./article";

// Let's create our store - big container for our app's data
export const store = configureStore({
    // What goes inside the store
    reducer: {
        // Save any data about articles
        [articleApi.reducerPath]: articleApi.reducer,
    },
    // Extra tools (middleware) to help with special tasks - check and process your actions before they reach the reducer
    middleware: (getDefaultMiddleware) => 
        // Get the regular tools and add our article tool to it
        getDefaultMiddleware().concat(articleApi.middleware)
})
