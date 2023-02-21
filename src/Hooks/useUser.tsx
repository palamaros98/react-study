import {IMenuItemWithUser} from "../Interfaces/MenuItemWithUser";
import {useState} from "react";
import {UseUserField} from "../Interfaces/UseUserField";
import {DeepPartial} from "tsdef";
import {cloneDeep, merge} from "lodash";

type MergeState<T> = [T, (change: DeepPartial<T>) => void]

export function useMerge<T>(initialValue: () => T, validationStateFn?: (value: T) => T | null): MergeState<T> {
  const [mergeItems, setMenuItemUser] = useState<T>(initialValue);

  const mergeState = (changes: DeepPartial<T>) => {
    setMenuItemUser((prevState) => {
      const clone = cloneDeep(prevState);
      return merge(clone, changes)
    })
  }

 return [mergeItems, mergeState]
}

export function useUser(initialValue: IMenuItemWithUser): UseUserField {
  const [menuItemWithUsers, setUser] = useState<IMenuItemWithUser>(initialValue);

  const setUserName = (value: any) => setUser((previousUser: IMenuItemWithUser) => (
    {
      ...previousUser,
      [value.userItem]: {
        name: value.name,
        surname: previousUser[value.userItem].surname
      }
    }
  ));

  const setUserSurname = (value: any) => setUser((previousUser: IMenuItemWithUser) => (
    {
      ...previousUser,
      [value.userItem]: {
        name: previousUser[value.userItem].name,
        surname: value.surname
      }
    }
  ));

  return {
    menuItemWithUsers,
    setUserName,
    setUserSurname,
  };
}