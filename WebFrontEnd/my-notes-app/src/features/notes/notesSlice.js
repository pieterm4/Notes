import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetAllNotes, Note } from '../../helpers/Api';

const initialState = {
    notes: [],
    isFetching: false,
    isSuccess: false,
    errorMessage: "",
    isError: false,
    noteCreated: false,
    noteDeleted: false,
};

export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${GetAllNotes}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            let data = await response.json();
            if(response.status === 200) {
                return data;
            }

            return thunkAPI.rejectWithValue(data);
        }
        catch (e) {
            console.error(e);

            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${Note}/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            let data = await response.json();
            if(response.status === 200 && data.success) {
                return data.id;
            }

            return thunkAPI.rejectWithValue(data);
        }
        catch (e) {
            console.error(e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = "";
            state.isError = false;
            state.noteCreated = false;
            state.noteDeleted = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchNotes.pending, (state) => {
            state.isFetching = true;
        })
        .addCase(fetchNotes.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.isError = false;
            state.errorMessage = "";
            state.notes = action.payload;
        })
        .addCase(fetchNotes.rejected, (state, action) => {
            state.isSuccess = false;
            state.isError = true;
            state.isFetching = false;
            state.errorMessage = action.payload.message;
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
            state.notes = state.notes.filter(n => n.id !== action.payload);
            state.noteDeleted = true;
        })
        .addCase(deleteNote.rejected, (state, action) => {
            state.noteDeleted = true;
            state.isError = true;
            state.errorMessage = action.payload;
        })
        
    }

});

const { reducer, actions } = notesSlice;

export const { clearState } = actions;
export default reducer;
export const notesSelector = (state) => state.notes;