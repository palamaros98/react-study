import {IUser} from "./User";

export interface IMenuItemWithUsersList {
  [prop: string]: IUser[];
}