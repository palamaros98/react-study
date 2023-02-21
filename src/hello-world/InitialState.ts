import {IUser} from "../Interfaces/User";
import {ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction} from "react";
import {IMenuItemWithUser} from "../Interfaces/MenuItemWithUser";
import {IMenuItemWithUsersList} from "../Interfaces/MenuItemWithUsersList";
import {MenuItemBtnAction} from "../Interfaces/MenuItemBtnAction";

export const menuItems = [
  {name: 'Products'},
  {name: 'Delivery'},
  {name: 'Contacts'},
  {name: 'Categories'},
  {name: 'Store'},
  {name: 'Map'}
]

export function getInitialMenuObject(): IMenuItemWithUser {
  const menuItemsObj: {[key:string]: IUser} = {};
  menuItems.forEach((item) => menuItemsObj[item.name] = {name: '', surname: ''})

  return menuItemsObj;
}

export function getInitialMenuUsersObject(): IMenuItemWithUsersList {
  const menuItemsObj: IMenuItemWithUsersList = {};
  menuItems.forEach((item) => menuItemsObj[item.name] = [])

  return menuItemsObj;
}

export function getInitialMenuItemBtnAction(): MenuItemBtnAction {
  const menuItemsObj: MenuItemBtnAction = {};
  menuItems.forEach((item) => menuItemsObj[item.name] = false)

  return menuItemsObj;
}

export function buildChangeHandler(
  setter: Dispatch<SetStateAction<string>>
): ChangeEventHandler<HTMLInputElement> {
  return (event: ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  };
}
