import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'f5fc1abd73msha019e2a810140f0p117d2fjsn21c1f292ca40');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world' }),
    })
});

export const {
    useGetTopChartsQuery,
} = shazamCoreApi