// Get tools from the toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get key to communicate to the summary service
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

// Connection to the article summary service
export const articleApi = createApi({
    // Give a name to this part of my app data
    reducerPath: 'articleApi',

    // Where to find the service and how to communicate
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            // Use my api key 
            headers.set('X-RapidAPI-Key', rapidApiKey);
            // Tell the service who to connect to
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers; 
        },
    }),
    // What I want to do with the service
    endpoints: (builder) => ({
        getSummary: builder.query({
            // Get the service to return a short version of article
            // Making sure the web address given is in the right format
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        }),
    }),
})

// Tool to grab the summary when I need it
export const { useLazyGetSummaryQuery } = articleApi;
