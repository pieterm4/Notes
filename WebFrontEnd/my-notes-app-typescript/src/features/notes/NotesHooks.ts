import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../app/hooks';
import INote from '../../Domain/Model/INote';
import { getSelectedFolder } from '../folders/foldersSlice';
import { useGetNotesQuery } from './notesSlice';

interface IUseGetNotesResult {
    selectedFolderId: string;
    notesForSelectedFolder: INote[];
}
const useGetNotes = (): IUseGetNotesResult => {
    const { isError, data } = useGetNotesQuery(undefined);

    useEffect(() => {
        if (isError) {
            toast.error('Failed to load notes.');
        }
    }, [isError]);

    const selectedFolderId = useAppSelector((state) => getSelectedFolder(state));
    const notesForSelectedFolder =
        data === undefined ? new Array<INote>() : data.filter((x) => x.folderId == selectedFolderId);

    return { selectedFolderId, notesForSelectedFolder };
};

export default useGetNotes;
