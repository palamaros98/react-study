import {useEffect, useState} from "react";
import {getInitialMenuItemBtnAction, getInitialMenuObject, getInitialMenuUsersObject} from "./InitialState";
import {TableUsers} from "./TableUsers";
import {Button} from "../Components/Button";
import {Input} from "../Components/Input";
import {useMerge} from "../Hooks/useUser";
import {IMenuItemWithUser} from "../Interfaces/MenuItemWithUser";
import {IMenuItemWithUsersList} from "../Interfaces/MenuItemWithUsersList";

export type BtnActionFn = (menuItem: string, menuItemWithUser: IMenuItemWithUser) => void;

export function Item(props: {items: Array<{name: string}>}): JSX.Element {
  const {items} = props;
  const [menuItemWithUsers, setMenuItemUser] = useMerge(getInitialMenuObject);
  const [users, setUsers] = useState<IMenuItemWithUsersList>(getInitialMenuUsersObject);

  const checkDisableBtn = (btnAction: 'add' | 'delete', menuItem: string): boolean => {
    return (btnAction === 'add' && (menuItemWithUsers[menuItem].name === '' || menuItemWithUsers[menuItem].surname === '')) ||
      (btnAction === 'delete' && users[menuItem].length === 0)
  }

  const addUser: BtnActionFn = (menuItem: string, menuItemWithUser: IMenuItemWithUser) => setUsers((previousUsers: IMenuItemWithUsersList) => {
    const usersList = {...previousUsers};

    if (!usersList[menuItem]){
      usersList[menuItem] = [];
    }
    usersList[menuItem].push({
      name: menuItemWithUser[menuItem].name,
      surname: menuItemWithUser[menuItem].surname,
    });

    setMenuItemUser({ [menuItem]: { name: '', surname: '' } });

    return usersList;
  });

  const deleteLastUser: BtnActionFn = (menuItem: string, menuItemWithUser: IMenuItemWithUser) => setUsers((previousUsers: IMenuItemWithUsersList) => {
    const usersList = {...previousUsers};

    if (!usersList[menuItem]){
      usersList[menuItem] = [];
    }

    usersList[menuItem].pop();

    return usersList;
  });
  const [menuItemBtnAction, setCheckboxBtnAction] = useMerge(() => getInitialMenuItemBtnAction(addUser));

  const changeCheckbox = (event: any) => {
    const {value: menuItem} = event.target.dataset;
    const isAddAction = !(menuItemBtnAction[menuItem].action === 'add');
    const fn = isAddAction ? addUser : deleteLastUser;
    const action = isAddAction ? 'add' : 'delete';
    const disabled = checkDisableBtn(action, menuItem);

    setCheckboxBtnAction({
      [menuItem]: { action, fn, disabled }
    })
  }

  useEffect(() => {
    for (const menuItem in menuItemBtnAction) {
      const disabled = checkDisableBtn(menuItemBtnAction[menuItem].action, menuItem);
      setCheckboxBtnAction({ [menuItem]: { disabled } });
    }

  }, [users, menuItemWithUsers]);

  return (
    <>
      {
        items.map((item, index) => {
            return (<li key={index} className="item">
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex'}}>
                  <Button
                    name={item.name}
                    onClick={() => menuItemBtnAction[item.name].fn(item.name, menuItemWithUsers)}
                    disabled={menuItemBtnAction[item.name].disabled}
                  />
                  <label htmlFor={`${item.name}-checkbox`}>{menuItemBtnAction[item.name].action === 'add' ? 'Add' : 'Delete'}</label>
                  <input
                    type={'checkbox'}
                    name={`${item.name}-checkbox`}
                    data-value={item.name}
                    onChange={changeCheckbox}
                    checked={menuItemBtnAction[item.name].action === 'add'}
                  />
                </div>
                <Input onChange={(name) => setMenuItemUser({ [item.name]: { name } })} value={menuItemWithUsers[item.name]?.name}/>
                <Input onChange={(surname) => setMenuItemUser({ [item.name]: { surname } })} value={menuItemWithUsers[item.name]?.surname}/>
                <TableUsers users={users[item.name]}/>
              </div>
            </li>)
          }
        )
      }
    </>
  )
}
