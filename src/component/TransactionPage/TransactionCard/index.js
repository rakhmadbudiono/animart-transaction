import React, { Component } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Tracking from "./Tracking";

import "./index.css";

class TransactionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      product_name: this.props.product_name,
      price: this.props.price,
      amount: this.props.amount,
      awb: this.props.awb,
      courier: this.props.courier
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Body>
            <div className='transaction-card'>
              <Card.Img
                variant='top'
                src='logo192.png'
                style={{ width: "10vw" }}
              />
              <div className='transaction-details'>
                <Card.Title>{this.state.product_name}</Card.Title>
                <Card.Text>
                  <div className='payload'>
                    <div className='price'>Rp {this.state.price}</div>
                    <div className='amount'>({this.state.amount} items)</div>
                  </div>
                </Card.Text>

                <div className='right-button'>
                  <Button variant='primary' onClick={this.handleShow}>
                    Lacak
                  </Button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Tracking awb={this.state.awb} courier={this.state.courier} />
        </Modal>
      </>
    );
  }
}

export default TransactionCard;
