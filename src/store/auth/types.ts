import * as i from "types";
import { Thunk, Action } from "easy-peasy";

export type User = {
  userid:string
  email:string
};

export interface AuthModel {
  uid:string,
  login: Thunk<i.AuthModel, {email:string, password:string}>,
  setuid: Action<i.AuthModel, {userid:string}>,
  logout: Thunk<i.AuthModel, {userid:string}>,
}
