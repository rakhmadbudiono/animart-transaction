import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import TransactionPage from "./component/TransactionPage";

function App() {
  return (
    <>
      <Switch>
        <Route path='/transaction' component={TransactionPage} />
      </Switch>
    </>
  );
}

export default App;
