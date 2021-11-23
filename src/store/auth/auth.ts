import * as i from "types";
import { thunk, action } from "easy-peasy";

import { history } from "../../routers/AppRouter";

const authModel: i.AuthModel = {
  uid: "",

  login: thunk(async (actions, payload) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: payload.email, password: payload.password }),
    });

    if (res.ok) {
      const user = await res.json() as i.User;
      window.localStorage.setItem("userid", user.userid);
      actions.setuid({ userid: user.userid });
    } else {
      throw new Error("Failed to log in.");
    }
  }),

  setuid: action((state, payload) => {
    state.uid = payload.userid;
  }),

  logout: thunk(async (actions, payload) => {
    try {
      const res = await fetch(`api/user/${payload.userid}/auth/logout`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        });
      if (res.ok) {
        window.localStorage.removeItem("userid");
        actions.setuid({ userid: "" });
      } else {
        history.push("/internal-error");
      }
    } catch (e) {
      history.push("/internal-error");
    }
  }),
};


export default authModel;
