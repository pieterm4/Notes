import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetAllFolders, Folder } from '../../helpers/Api';

const initialState = {
    folders: [],
    isFetching: false,
    isSuccess: false,
    errorMessage: "",
    isError: false,
    folderCreated: false,
    folderDeleted: false,
};

export const fetchFolders = createAsyncThunk(
    'folders/fetchFolders',
    async (thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${GetAllFolders}`, {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
          let data =  await response.json();
          if(response.status === 200) {
              return data;
          }

          return thunkAPI.rejectWithValue(data);
        }
        catch(e) {
            console.error(e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const createNewFolder = createAsyncThunk(
    'folders/create',
    async (title, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const paramJson = JSON.stringify({title});
            const response = await fetch(`${Folder}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: paramJson
            });

            let data = await response.json();
            if(response.status === 200 && data.success) {
                return data;
            }

            return thunkAPI.rejectWithValue(data.message);
        }
        catch(e) {
            thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteFolder = createAsyncThunk(
    'folders/delete',
    async (id, thinkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${Folder}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        
        if(response.status === 200) {
            return {id};
        }

        return thinkAPI.rejectWithValue(response);
        }
        catch(e) {
            thinkAPI.rejectWithValue(e.message);
        }
        
    }
);


export const folderSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.errorMessage = "";
            state.folderCreated = false;
            state.folderDeleted = false;
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchFolders.pending, (state) => {
            state.isFetching = true;
        })
        .addCase(fetchFolders.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.isError = false;
            state.folders = action.payload;
        })
        .addCase(fetchFolders.rejected, (state, action) => {
            state.isSuccess = false;
            state.isError = true;
            state.isFetching = false;
            state.errorMessage = action.payload.message;
        })
        .addCase(createNewFolder.fulfilled, (state, action) => {
            state.folderCreated = true;
            state.isError = false;
            state.isFetching = false;
            state.folders.push(action.payload.folder);
        })
        .addCase(createNewFolder.rejected, (state, action) => {
            state.folderCreated = false;
            state.isError = true;
            state.isFetching = false;
            state.errorMessage = action.payload.message;
        })
        .addCase(deleteFolder.fulfilled, (state, action) => {
            state.folders = state.folders.filter(x => x.id !== action.meta.arg);
            state.folderDeleted = true;
        })
        .addCase(deleteFolder.rejected, (state, action) => {
            state.folderDeleted = false;
            state.isError = true;
            state.errorMessage = action.payload

        })
    }
});



const { reducer, actions } = folderSlice;

export const { clearState } = actions;

export default reducer;

export const folderSelector = (state) => state.folders;