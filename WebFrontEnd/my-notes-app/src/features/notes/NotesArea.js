import React, { useEffect, useState } from 'react'
import NotesList from './NotesList'
import { PlusIcon} from "@heroicons/react/solid";
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { notesSelector, fetchNotes, clearState, deleteNote} from './notesSlice';
import toast  from 'react-hot-toast';
import { DeleteDialog } from '../../components/DeleteDialog';

export default function NotesArea({selectedFolder}) {
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState("");
  const dispatch = useDispatch();
  const {notes, isError, errorMessage, noteDeleted} = useSelector(notesSelector);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  useEffect(() => {
    if(isError) {
      toast.error(errorMessage);
      dispatch(clearState);
    }

  }, [isError, errorMessage]);

  useEffect(() => {
    if(noteDeleted)
    {
      toast.success("Note has been deleted");
      dispatch(clearState);
    }
  }, [noteDeleted]);
  

  function handleAddNoteClick() {
    console.log("Add new note");
  }

  function handleDeleteNoteClick(noteId) {

    setNoteIdToDelete(noteId);
    setIsDeleteDialogOpen(true);
  }

  function handleCloseDialog() {
    setNoteIdToDelete("");
    setIsDeleteDialogOpen(false);
  }

  function handleNoteDelete() {
    dispatch(deleteNote(noteIdToDelete));
    handleCloseDialog();
  }


  return (
    <div className='flex flex-col w-full'>
        <div className='p-2 h-full md:h-[calc(100vh_-_(48px_+_144px))] flex-grow'>
            <NotesList items = {notes.filter(n => n.folderId === selectedFolder)} onDelete={handleDeleteNoteClick} />
        </div>
        <div className=' text-white w-full mt-auto mb-auto flex justify-end h-full'>
        <div id="folderButtons" className="mr-[23px]">
            <Button onClick={handleAddNoteClick}>
                <PlusIcon className="w-10 h-10" />
            </Button>
        </div>
        </div>
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          close={handleCloseDialog}
          title="Remove note"
          onDelete={handleNoteDelete}
          message="Are you sure you wanna delete this note?"
         />
    </div>
  )
}
