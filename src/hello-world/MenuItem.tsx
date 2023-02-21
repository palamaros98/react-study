import {useState} from "react";
import {getInitialMenuItemBtnAction, getInitialMenuObject, getInitialMenuUsersObject} from "./InitialState";
import {TableUsers} from "./TableUsers";
import {Button} from "../Components/Button";
import {Input} from "../Components/Input";
import {useMerge} from "../Hooks/useUser";
import {IMenuItemWithUser} from "../Interfaces/MenuItemWithUser";
import {IMenuItemWithUsersList} from "../Interfaces/MenuItemWithUsersList";

type BtnActionFn = (menuItem: string, menuItemWithUser?: IMenuItemWithUser) => void;

export function Item(props: {items: Array<{name: string}>}): JSX.Element {
  const {items} = props;
  const [menuItemWithUsers, setMenuItemUser] = useMerge(getInitialMenuObject);
  const [users, setUsers] = useState<IMenuItemWithUsersList>(getInitialMenuUsersObject);

  const addUser = (menuItem: string, menuItemWithUser: IMenuItemWithUser) => setUsers((previousUsers: IMenuItemWithUsersList) => {
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

  const deleteLastUser = (menuItem: string, menuItemWithUser: IMenuItemWithUser) => setUsers((previousUsers: IMenuItemWithUsersList) => {
    const usersList = {...previousUsers};

    if (!usersList[menuItem]){
      usersList[menuItem] = [];
    }

    usersList[menuItem].pop();

    return usersList;
  });

  const [btnActionFn, setBtnActionFn] = useState<BtnActionFn>(() => addUser);

  const [menuItemBtnAction, setCheckboxBtnAction] = useMerge(getInitialMenuItemBtnAction);

  const changeCheckbox = (event: any) => {
    const {value: menuItem} = event.target.dataset;
    const action = menuItemBtnAction[menuItem] ? deleteLastUser : addUser;
    setBtnActionFn(() => action);

    setCheckboxBtnAction({ [menuItem]: !menuItemBtnAction[menuItem] })
  }

  return (
    <>
      {
        items.map((item, index) => {
            return (<li key={index} className="item">
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex'}}>
                  <Button name={item.name} onClick={() => btnActionFn(item.name, menuItemWithUsers)}/>
                  <label htmlFor={`${item.name}-checkbox`}>{menuItemBtnAction[item.name] ? 'Add' : 'Delete'}</label>
                  <input
                    type={'checkbox'}
                    name={`${item.name}-checkbox`}
                    data-value={item.name}
                    onChange={changeCheckbox}
                    checked={menuItemBtnAction[item.name]}
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