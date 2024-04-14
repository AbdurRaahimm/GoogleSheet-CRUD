import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';  


// const sheetUrl = 'https://script.google.com/macros/s/AKfycbwnnYqBxVCaI83q8glalTnLA8PZPdbwMBGkaxdHxE6dGM5C0S24YoBuTugrwoc1iEV6/exec'
const sheetUrl = 'https://script.google.com/macros/s/AKfycbyVlE7I5EdidDOyI4fZZIMTVhGf45FlmQajUY8bWeUTHHHEqSDn8wQ_JlM6rgUOEyf3/exec'


// fetch posts
export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
    const response = await fetch(sheetUrl);
    return await response.json();
});

// add post
export const addPost = createAsyncThunk('addPost', async (data) => {
    const response = await fetch(sheetUrl, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    return await response.text();
});

// delete post 
export const deletePost = createAsyncThunk('deletePost', async (id) => {
    const response = await fetch(sheetUrl+`?del=true&id=${id}`);
    return await response.text();
});

// update post 
export const updatePost = createAsyncThunk('updatePost', async (updatedData) => {
    const response = await fetch(sheetUrl+`?update=true&id=${updatedData.id}&title=${updatedData.title}&content=${updatedData.content}`);
    return await response.text();
});

// export const updatePost = createAsyncThunk('updatePost', async (updatedData) => {
//     const response = await fetch(sheetUrl+`?update=true`,{
//         method: 'PUT',
//         body: JSON.stringify(updatedData),
//     });
//     return await response.text();
// });

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoading: false,
        isError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });  

        builder
            .addCase(addPost.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts.push(action.payload);
            })
            .addCase(addPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });

    },
});

export default postsSlice.reducer;

