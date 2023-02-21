import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../../API/Api';
import { RootState } from '../../app/store';
import { IFolder } from '../../Domain/Model/IFolder';
import { ICreateFolderRequest } from './create/ICreateFolderRequest';
import { ICreateFolderResponse } from './create/ICreateFolderResponse';
import { IDeleteFolderResponse } from './delete/IDeleteFolderResponse';

export interface FoldersState {
    folders: IFolder[];
    status: 'idle' | 'loading' | 'failed';
    errorMessage: String;
}

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['Folder'] });
const folderApi = apiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getFolders: build.query<IFolder[], undefined>({
            query: () => 'Folder/All',
            providesTags: (result) => {
                if (result !== null && result !== undefined) {
                    return [
                        ...result.map(({ id }) => ({ type: 'Folder' as const, id })),
                        { type: 'Folder', id: 'LIST' },
                    ];
                } else {
                    return [{ type: 'Folder', id: 'LIST' }];
                }
            },
        }),
        createFolder: build.mutation<ICreateFolderResponse, ICreateFolderRequest>({
            query: (createFolderRequest: ICreateFolderRequest) => ({
                url: 'Folder',
                method: 'POST',
                body: createFolderRequest,
            }),
            invalidatesTags: [{ type: 'Folder' }],
        }),
        deleteFolder: build.mutation<IDeleteFolderResponse, string>({
            query: (id: string) => ({
                url: `/Folder/${id}`,
                method: 'Delete',
            }),
            invalidatesTags: ['Folder'],
        }),
    }),
    overrideExisting: false,
});

export interface IFoldersState {
    selectedFolderId: string;
}

const initialState: IFoldersState = {
    selectedFolderId: '',
};

const folderSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        setSelectedFolder: (state, { payload }: PayloadAction<string>) => {
            state.selectedFolderId = payload;
        },
    },
});

export const { useGetFoldersQuery, useCreateFolderMutation, useDeleteFolderMutation } = folderApi;

export const { setSelectedFolder } = folderSlice.actions;
export default folderSlice.reducer;
export const getSelectedFolder = (state: RootState): string => state.foldersSlice.selectedFolderId;
