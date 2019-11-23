import React, { Component } from "react";
import axios from "axios";
import { Modal, Table } from "react-bootstrap";

import "./index.css";

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      awb: this.props.awb,
      date: null,
      courier: this.props.courier,
      history: []
    };
  }

  async componentDidMount() {
    this.setState({
      result: await axios.get("http://localhost:5000/trackReceipt", {
        params: { no_resi: this.state.awb, nama_kurir: this.state.courier }
      })
    });

    this.setState({
      date: this.state.result.data.delivery_time,
      history: this.state.result.data.timeline
    });
  }

  render() {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Tracking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          No. Resi : {this.state.awb}
          <br />
          Tanggal Kirim : {this.state.date}
          <br />
          Kurir : {this.state.courier}
          <div className='location-history'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Waktu</th>
                </tr>
              </thead>
              <tbody>
                {this.state.history.map(checkpoint => (
                  <tr key={checkpoint.Tanggal}>
                    <td>{checkpoint.Keterangan}</td>
                    <td>{checkpoint.Tanggal}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </>
    );
  }
}

export default Tracking;
