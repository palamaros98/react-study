import {MouseEventHandler} from "react";

export function Button(props: {
  name: string,
  disabled?: boolean,
  onClick: MouseEventHandler<HTMLButtonElement>,
}): JSX.Element {
  const {name, onClick, disabled = false} = props;
  return <button data-value={name} onClick={onClick} disabled={disabled}>{name}</button>
}