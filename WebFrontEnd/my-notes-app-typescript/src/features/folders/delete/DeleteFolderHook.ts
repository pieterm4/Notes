import { useDeleteFolderMutation } from "../foldersSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useToggle } from "../../../Utils/Hooks";

interface IResultType {
  showDeleteFolderModal: boolean;
  toggleDeleteFolderModal: any;
  folderToDeleteId: string | null;
  deleteButtonClicked: (folderId: string) => void;
  handleFolderDelete: (folderId: string) => Promise<void>;
}
const useDeleteFolder = (): IResultType => {
  const [deleteFolder, { isSuccess, isError, data }] =
    useDeleteFolderMutation();
  const [showDeleteFolderModal, toggleDeleteFolderModal] = useToggle(false);
  const [folderToDeleteId, setFolderToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (isError) {
      toast.error(data?.validationErrors);
    }
  }, [isError]);

  useEffect(() => {
    if (data === null || data === undefined) {
      return;
    }

    if (isSuccess && data.success) {
      toast.success("Folder has been deleted");
    }
  }, [isSuccess]);

  async function handleFolderDelete(folderId: string): Promise<void> {
    try {
      await deleteFolder(folderId);
    } catch (error) {
      let message = "Unknown error during folder deletion.";
      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  }

  const deleteButtonClicked = (folderId: string): void => {
    setFolderToDeleteId(folderId);
    toggleDeleteFolderModal();
  };

  return {
    showDeleteFolderModal,
    toggleDeleteFolderModal,
    folderToDeleteId,
    handleFolderDelete,
    deleteButtonClicked,
  };
};

export default useDeleteFolder;
