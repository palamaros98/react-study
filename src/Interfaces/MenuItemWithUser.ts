import {IUser} from "./User";

export interface IMenuItemWithUser {
  [prop: string]: IUser;
}