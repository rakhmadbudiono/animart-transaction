import React, { Component } from "react";
import axios from "axios";
import { Modal, Table } from "react-bootstrap";

import "./index.css";

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      awb: this.props.awb,
      date: null,
      courier: this.props.courier
    };
  }

  async componentDidMount() {
    this.setState({
      data: await axios.get("http://localhost:5000/trackReceipt", {
        params: { no_resi: this.state.awb, nama_kurir: this.state.courier }
      })
    });
  }

  render() {
    console.log(this.state.data);
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
                  <th>Lokasi</th>
                  <th>Waktu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </>
    );
  }
}

export default Tracking;
