'use client'
import React from "react";
import { Provider } from "react-redux";
import store from "./store";

function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;


// http://localhost:3000/verify-mail?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua2l0MjcxLnJlam9pY2VAZ21haWwuY29tIiwiZXhwIjoxNzEyNTczNDc2fQ.4-EQAKU6zf-KPcrIUgeAICmUunkjJMKWLvBfX7JVY7k&key=703935&type=user-verify
