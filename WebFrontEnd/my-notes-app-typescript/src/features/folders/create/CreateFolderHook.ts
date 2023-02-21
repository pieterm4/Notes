import { useEffect } from "react";
import { toast } from "react-toastify";
import { useToggle } from "../../../Utils/Hooks";
import { useCreateFolderMutation } from "../foldersSlice";
import { ICreateFolderRequest } from "./ICreateFolderRequest";

interface IResultType {
  showCreateFolderModal: boolean;
  toggleCreateFolderModal: any;
  handleCreateFolder: (folderName: string) => Promise<void>;
}
const useCreateFolder = (): IResultType => {
  const [createFolder, { isError, isSuccess, data }] =
    useCreateFolderMutation(undefined);
  const [showCreateFolderModal, toggleCreateFolderModal] = useToggle(false);

  useEffect(() => {
    if (isError) {
      toast.error(data?.validationErrors);
    }
  }, [isError]);

  useEffect(() => {
    if (data === null || data === undefined) {
      return;
    }
    if (isSuccess && data?.success) {
      toast.success("Folder has been created");
    }
  }, [isSuccess]);

  const handleCreateFolder = async (folderName: string): Promise<void> => {
    try {
      const createRequest: ICreateFolderRequest = {
        title: folderName,
      };
      await createFolder(createRequest);
    } catch (error) {
      let message = "Unknown error during folder creation.";
      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  };

  return { showCreateFolderModal, toggleCreateFolderModal, handleCreateFolder };
};

export default useCreateFolder;
