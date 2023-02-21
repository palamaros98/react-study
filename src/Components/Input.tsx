import {ChangeEvent, FocusEventHandler} from "react";

export function Input(props: {
  onChange: (newValue: string) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>,
  onBlur?: FocusEventHandler<HTMLInputElement>,
  value?: string,
}): JSX.Element {
  const {onChange, onFocus, onBlur, value} = props;

  return (<input onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)} onFocus={onFocus} onBlur={onBlur} value={value}/>)
}