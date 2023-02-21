import {useState} from "react";
import {getInitialMenuObject, getInitialMenuUsersObject} from "./InitialState";
import {IUser} from "../Interfaces/User";
import {TableUsers} from "./TableUsers";
import {Button} from "../Components/Button";
import {Input} from "../Components/Input";
import {useUserMerge} from "../Hooks/useUser";
import {IMenuItemWithUser} from "../Interfaces/MenuItemWithUser";
import {IMenuItemWithUsersList} from "../Interfaces/MenuItemWithUsersList";

type UserAction = (menuItem: string, users: IMenuItemWithUsersList) => IMenuItemWithUsersList;

export function Item(props: {items: Array<{name: string}>}): JSX.Element {
  const {items} = props;
  const [menuItemWithUsers, setMenuItemUser] = useUserMerge<IMenuItemWithUser>(getInitialMenuObject);
  const [users, setUsers] = useState<IMenuItemWithUsersList>(getInitialMenuUsersObject);
  const [userAction, setUserAction] = useState<UserAction>(() => addUser);

  const addUser = (menuItem: string, users: IMenuItemWithUsersList): IMenuItemWithUsersList => {
    const usersList: IMenuItemWithUsersList = {...users};

    if (!usersList[menuItem]){
      usersList[menuItem] = [];
    }

    usersList[menuItem].push({
      name: menuItemWithUsers[menuItem].name,
      surname: menuItemWithUsers[menuItem].surname,
    });

    setMenuItemUser({ [menuItem]: { name: '', surname: '' } });

    return usersList;
  };

  const deleteLastUser = (menuItem: string, users: IMenuItemWithUsersList): IMenuItemWithUsersList => {
    const usersList: IMenuItemWithUsersList = {...users};

    usersList[menuItem].pop();

    setMenuItemUser({ [menuItem]: { name: '', surname: '' } });

    return usersList;
  };

  /*const addUser = (menuItem: string, users: IUser[]): IUser[] => setUsers((previousUsers: { [p: string]: IUser[] }) => {
    const {value: userItem} = event.target.dataset;
    const usersList = {...previousUsers};

    if (!usersList[userItem]){
      usersList[userItem] = [];
    }

    usersList[userItem].push({
      name: menuItemWithUsers[userItem].name,
      surname: menuItemWithUsers[userItem].surname,
    });

    setMenuItemUser({ [userItem]: { name: '', surname: '' } });

    return usersList;
  });*/

  return (
    <>
      {
        items.map((item, index) => {
            return (<li key={index} className="item">
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button name={item.name} onClick={() => userAction}/>
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