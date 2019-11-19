import React, { Component } from "react";

import TransactionCard from "./TransactionCard";

import "./index.css";

class TransactionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <TransactionCard product_name='MTG' price={100} amount={1} />
        <TransactionCard product_name='SI' price={200} amount={1} />
        <TransactionCard product_name='WBD' price={100} amount={2} />
      </>
    );
  }
}

export default TransactionPage;
