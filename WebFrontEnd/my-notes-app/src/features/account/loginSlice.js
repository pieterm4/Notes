import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Authenticate } from '../../helpers/Api';

export const loginUser = createAsyncThunk(
    'users/login',
    async ({email, password}, thunkAPI) => {
        try {

            const paramJson = JSON.stringify({email, password});
            const response = await fetch(`${Authenticate}`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                    body: paramJson,
                }
            );
            let data = await response.json();
            console.log('Response', data);
            if(response.status === 200) {
                if(data.success)
                {
                    localStorage.setItem('token', data.loginResponseDto.token);
                    localStorage.setItem('userEmail', data.loginResponseDto.email);
                    return { ...data, email: email };
                }

                return thunkAPI.rejectWithValue(data);
            }

            return thunkAPI.rejectWithValue(data);
        }
        catch(e) {
            console.log('Error', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const LogOut = ()=> {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
};



const initialState = {
    isFetching: false,
    isSuccess: false,
    userEmail: "",
    errorMessage: "",
    isError: false
}

const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.errorMessage = "";
      
            return state;
          },
        
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, { payload }) => {
            state.email = payload.loginResponseDto.email;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
          },
          [loginUser.rejected]: (state, { payload }) => {
            console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            if(payload.email !== "" && payload.succeeded === false) {
                state.errorMessage = "Wrong email or password";
            }
            else {
                state.errorMessage = payload !== undefined ? payload.message: "Unknown error";
            }
          },
          [loginUser.pending]: (state) => {
            state.isFetching = true;
          },
    }
});

const {reducer, actions} = loginSlice;

export const {clearState} = actions;

export default reducer;

export const userSelector = (state) => state.user;