import {useState} from "react";
import {getInitialMenuObject, getInitialMenuUsersObject} from "./InitialState";
import {TableUsers} from "./TableUsers";
import {Button} from "../Components/Button";
import {Input} from "../Components/Input";
import {useUserMerge} from "../Hooks/useUser";
import {IMenuItemWithUser} from "../Interfaces/MenuItemWithUser";
import {IMenuItemWithUsersList} from "../Interfaces/MenuItemWithUsersList";

export function Item(props: {items: Array<{name: string}>}): JSX.Element {
  const {items} = props;
  const [menuItemWithUsers, setMenuItemUser] = useUserMerge<IMenuItemWithUser>(getInitialMenuObject);
  const [users, setUsers] = useState<IMenuItemWithUsersList>(getInitialMenuUsersObject)

  const addUser = (event: any) => setUsers((previousUsers: IMenuItemWithUsersList) => {
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
  });

  return (
    <>
      {
        items.map((item, index) => {
            return (<li key={index} className="item">
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button name={item.name} onClick={addUser}/>
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