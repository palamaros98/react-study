import './HelloWorld.css';
import {
    ChangeEventHandler,
    ReactNode,
    FocusEventHandler,
    Fragment,
    MouseEventHandler,
    useState,
    Dispatch,
    SetStateAction, ChangeEvent
} from "react";

const menuItems = [{name: 'Products'}, {name: 'Delivery'}, {name: 'Contacts'}, {name: 'Categories'}, {name: 'Store'}, {name: 'Map'}]

interface User {
  name: string,
  surname: string
}

export function HelloWorld(): JSX.Element {
    return <div>Hello, world! 👽</div>;
}

export const AlsoHelloWorld = (): JSX.Element => {
    return <div>Also hello, world! 👽</div>;
};

export const NewHelloWorld = (): JSX.Element => {
    return <Header/>;
}

export function Header(): JSX.Element {
    return (
        <section>
            <Menu>
                <Item items={menuItems}/>
            </Menu>
        </section>
    )
}

export function Menu(props: {children: ReactNode}): JSX.Element {
    return (
      <ul className="menu">
          {props.children}
      </ul>
    )
}

export function ItemButton(props: {
  name: string,
  onClick: MouseEventHandler<HTMLButtonElement>,
}): JSX.Element {
  const {name, onClick} = props;
  return <button data-value={name} onClick={onClick}>{name}</button>
}

export function ItemInput(props: {
  onChange: ChangeEventHandler<HTMLInputElement>,
  onFocus?: FocusEventHandler<HTMLInputElement>,
  onBlur?: FocusEventHandler<HTMLInputElement>,
  value?: string,
}): JSX.Element {
  const {onChange, onFocus, onBlur, value} = props;

  return (<input onChange={onChange} onFocus={onFocus} onBlur={onBlur} value={value}/>)
}

export function TableInputValues(props: {users: User[]}): JSX.Element {
  const {users}= props;

  if(!users) {
    return <></>
  }

  return (
    <>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
        </tr>
        </thead>
        <tbody>
        {
          users.map(({name, surname}, index) => {

            return (
              <tr key={index}>
                <td>{name}</td>
                <td>{surname}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </>
  )
}

function buildChangeHandler(
  setter: Dispatch<SetStateAction<{value: string, userItem: string}>>,
  userItem: string
): ChangeEventHandler<HTMLInputElement> {
  return (event: ChangeEvent<HTMLInputElement>) => {
    setter({value: event.target.value, userItem});
  };
}

function getInitialMenuObject(): {[key:string]: User} {
  const menuItemsObj: {[key:string]: User} = {};
  menuItems.forEach((item) => menuItemsObj[item.name] = {name: '', surname: ''})

  return menuItemsObj;
}

export function Item(props: {items: Array<{name: string}>}): JSX.Element {
  const {items} = props;
  const [user, setUser] = useState<{ [prop: string]: User }>(getInitialMenuObject());
  const [users, setUsers] = useState<{ [prop: string]: User[] }>({})

  const setUserName = (value: any) => setUser((previousUser) => {
    return {
      ...previousUser,
      [value.userItem]: { name: value.value, surname: previousUser[value.userItem].surname }
    }
  });

  const setUserSurname = (value: any) => setUser((previousUser) => {
    return {
      ...previousUser,
      [value.userItem]: { name: previousUser[value.userItem].name, surname: value.value }
    };
  });

  const addUser = (event: any) => setUsers((previousUsers) => {
    console.log('vasa')
    return previousUsers;
  });

  return (
    <>
      {
        items.map((item, index) => {
            const onFocus = () => (console.log(`${item.name} FOCUSED`))
            const onBlur = () => (console.log(`${item.name} BLURED`))

            return (<li key={index} className="item">
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <ItemButton name={item.name} onClick={addUser}/>
                <ItemInput onChange={buildChangeHandler(setUserName, item.name)} value={user?.[item.name]?.name}/>
                <ItemInput onChange={buildChangeHandler(setUserSurname, item.name)} value={user?.[item.name]?.surname}/>
                <TableInputValues users={users[item.name]}/>
              </div>
            </li>)
          }
        )
      }
    </>
  )
}




