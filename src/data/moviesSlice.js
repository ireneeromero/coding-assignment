import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async ({ apiUrl, params }, { rejectWithValue }) => {

    try {
        const url = new URL(apiUrl);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        fetchStatus: '',
        hasMore: true,
        page: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            if (action.payload?.page === 1) {
                state.movies = action?.payload?.results
            } else {
                state.movies = [...state?.movies, ...action?.payload?.results]
            }
            state.page = action?.payload?.page
            state.hasMore = action?.payload?.page < action?.payload?.total_pages
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice