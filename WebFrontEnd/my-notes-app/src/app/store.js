import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/account/loginSlice';
import folderReducer from '../features/folders/folderSlice';
import notesReducer from '../features/notes/notesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: loginReducer,
    folders: folderReducer,
    notes: notesReducer,
  },
});
