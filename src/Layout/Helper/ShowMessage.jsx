import React, { Component } from 'react'
import { Modal } from "react-bootstrap";

export default class ShowMessage extends Component {
    render() {
        return (
            <Modal show={this.props.show}>
                <div className="text-center">
                    <p>{this.props.mess}</p>
                    <button className="btn-primary btn">OK</button>
                </div>
            </Modal>
        )
    }
}
