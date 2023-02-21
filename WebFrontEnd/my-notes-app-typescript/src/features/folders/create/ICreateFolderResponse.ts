import { IBaseResponse } from "../../../Domain/Model/IBaseResponse";
import { IFolder } from "../../../Domain/Model/IFolder";

export interface ICreateFolderResponse extends IBaseResponse {
  folder: IFolder;
}
