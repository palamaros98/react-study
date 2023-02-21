import {MouseEventHandler} from "react";

export function Button(props: {
  name: string,
  onClick: MouseEventHandler<HTMLButtonElement>,
}): JSX.Element {
  const {name, onClick} = props;
  return <button data-value={name} onClick={onClick}>{name}</button>
}