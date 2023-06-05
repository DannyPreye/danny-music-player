import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core7.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'f5fc1abd73msha019e2a810140f0p117d2fjsn21c1f292ca40');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/get-top-songs-in-world' }),
        getSongsByGenre: builder.query({ query: (genre) => `/charts/get-top-songs-in_world_by_genre?genre=${genre}` }),
        getSongDetails: builder.query({ query: ({ id }) => `/songs/get_details?id=${id}` }),
        getSongRelated: builder.query({ query: ({ songid }) => `/songs/list-recommendations?id=${songid}` }),
        getArtistDetails: builder.query({ query: (artistId) => `/artist/get-details?id=${artistId}` }),
        getSongsByCountry: builder.query({ query: (countryCode) => `/charts/get-top-songs-in-country?country_code=${countryCode}` }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}` }),
    }),

});

export const {
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
} = shazamCoreApi;
