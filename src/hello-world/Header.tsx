import {Item} from "./MenuItem";
import {menuItems} from "./InitialState";
import {Menu} from "./Menu";

export function Header(): JSX.Element {
  return (
    <section>
      <Menu>
        <Item items={menuItems}/>
      </Menu>
    </section>
  )
}
