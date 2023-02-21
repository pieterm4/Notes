import { IBaseResponse } from "../../../Domain/Model/IBaseResponse";

export interface IDeleteFolderResponse extends IBaseResponse {
  id: string | null | undefined;
}
