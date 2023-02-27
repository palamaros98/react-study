import {Item} from "./MenuItem";
import {menuItems} from "./InitialState";
import {Menu} from "./Menu";
import {UsersFromBack} from "../Users/Users";

export function Header(): JSX.Element {
  return (
    <section>
      <Menu>
        <Item items={menuItems}/>
      </Menu>
      <UsersFromBack/>
    </section>
  )
}
