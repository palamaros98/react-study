import './HelloWorld.css';
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  FocusEventHandler,
  Fragment,
  MouseEventHandler,
  SetStateAction,
  useState
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
          <Menu/>
        </section>
    )
}

export function Menu(): JSX.Element {
    return (
      <ul className="menu">
          <Item items={menuItems}/>
      </ul>
    )
}

export function ItemButton(props: {
  name: string,
  onClick: MouseEventHandler<HTMLButtonElement>,
}): JSX.Element {
  const {name, onClick} = props;
  console.log(name)
  return <button onClick={onClick}>{name}</button>
}

export function ItemInput(props: {
  onChange: ChangeEventHandler<HTMLInputElement>,
  onFocus: FocusEventHandler<HTMLInputElement>,
  onBlur: FocusEventHandler<HTMLInputElement>,
  value: string,
}): JSX.Element {
  const {onChange, onFocus, onBlur, value} = props;

  return (<input onChange={onChange} onFocus={onFocus} onBlur={onBlur} value={value}/>)
}

export function TableInputValues(props: {users: User[]}): JSX.Element {
  const {users}= props;
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
  setter: Dispatch<SetStateAction<string>>
): ChangeEventHandler<HTMLInputElement> {
  return (event: ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  };
}

export function Item(props: {items: Array<{name: string}>}): JSX.Element {
  const {items} = props;
  return (
    <>
      {
        items.map((item, index) => {
            const onFocus = () => (console.log(`${item.name} FOCUSED`))
            const onBlur = () => (console.log(`${item.name} BLURED`))
            const [name, setName] = useState<string>('');
            const [surname, setSurname] = useState<string>('');
            const [users, setUsers] = useState<User[]>([])

            const addUser = () => setUsers((previousUser) => [...previousUser, {name, surname}]);

            return (<li key={index} className="item">
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <ItemButton name={item.name} onClick={addUser}/>
                <ItemInput onChange={buildChangeHandler(setName)} onFocus={onFocus} onBlur={onBlur} value={name}/>
                <ItemInput onChange={buildChangeHandler(setSurname)} onFocus={onFocus} onBlur={onBlur} value={surname}/>
                <TableInputValues users={users}/>
              </div>
            </li>)
          }
        )
      }
    </>
  )
}




