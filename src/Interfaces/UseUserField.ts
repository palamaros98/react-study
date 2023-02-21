import {IMenuItemWithUser} from "./MenuItemWithUsers";

export interface UseUserField {
  menuItemWithUsers: IMenuItemWithUser;
  setUserName: (value: any) => void;
  setUserSurname: (value: any) => void;
}