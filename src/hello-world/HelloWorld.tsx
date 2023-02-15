import './HelloWorld.css';
import {ChangeEventHandler, FocusEventHandler, Fragment, MouseEventHandler} from "react";

const menuItems = [{name: 'Products'}, {name: 'Delivery'}, {name: 'Contacts'}, {name: 'Categories'}, {name: 'Store'}, {name: 'Map'}]

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

  return <button onClick={onClick}>{name}</button>
}

export function ItemInput(props: {
  onChange: ChangeEventHandler<HTMLInputElement>,
  onFocus: FocusEventHandler<HTMLInputElement> ,
  onBlur: FocusEventHandler<HTMLInputElement> ,
}): JSX.Element {
  const {onChange, onFocus, onBlur} = props;

  return (<input onChange={onChange} onFocus={onFocus} onBlur={onBlur}/>)
}

export function Item(props: {items: Array<{name: string}>}): JSX.Element {
  const {items} = props;

  return (
    <>
      {
        items.map(({name}, index) => {
            const onClick = () => (console.log(`${name} CLICKED`))
            const onChange: ChangeEventHandler<HTMLInputElement> = ($event) => (console.log(`${name} CHANGED ${$event.target.value}`))
            const onFocus = () => (console.log(`${name} FOCUSED`))
            const onBlur = () => (console.log(`${name} BLURED`))

            return (<li key={index} className="item">
              <ItemButton name={name} onClick={onClick}/>
              <ItemInput onChange={onChange} onFocus={onFocus} onBlur={onBlur}/>
            </li>)
          }
        )
      }
    </>
  )
}




