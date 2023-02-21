import {ReactNode} from "react";

export function Menu(props: {children: ReactNode}): JSX.Element {
  return (
    <ul className="menu">
      {props.children}
    </ul>
  )
}