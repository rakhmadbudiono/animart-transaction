import React, { Component } from "react";
import { Modal, Table } from "react-bootstrap";

import "./index.css";

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = { awb: this.props.awb };
  }

  componentDidMount() {}

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
