import React, { Component } from "react";
import axios from "axios";

import TransactionCard from "./TransactionCard";

import "./index.css";

class TransactionPage extends Component {
  constructor(props) {
    super(props);
    this.state = { result: null, transactions: [] };
  }

  async componentDidMount() {
    this.setState({
      result: await axios.get("http://localhost:5000/transaction")
    });

    this.setState({
      transactions: this.state.result.data
    });
  }

  render() {
    return (
      <>
        {this.state.transactions.map(transaction => (
          <TransactionCard
            product_name={transaction[2]}
            price={transaction[4]}
            amount={transaction[3]}
            awb={transaction[0]}
            courier={transaction[1]}
          />
        ))}
      </>
    );
  }
}

export default TransactionPage;
