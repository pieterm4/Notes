import { apiSlice } from '../../API/Api';
import INote from '../../Domain/Model/INote';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['Note'] });

const noteApi = apiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getNotes: build.query<INote[], undefined>({
            query: () => 'Note/All',
            providesTags: (result) => {
                if (result !== null && result !== undefined) {
                    return [
                        ...result.map(({ folderId }) => ({ type: 'Note' as const, folderId })),
                        { type: 'Note', id: 'LIST' },
                    ];
                } else {
                    return [{ type: 'Note', id: 'LIST' }];
                }
            },
        }),
    }),
});

export const { useGetNotesQuery } = noteApi;
