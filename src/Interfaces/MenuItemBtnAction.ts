import {BtnActionFn} from "../hello-world/MenuItem";

export interface MenuItemBtnAction {
  [prop: string]: {
    action: 'add' | 'delete',
    disabled: boolean,
    fn: BtnActionFn
  };
}