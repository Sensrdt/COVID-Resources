/***
 * Donation Component
 * 
 * Component is used for Donation QR Code and Messaging
 * 
 */


import React, { Component } from 'react'
import './Donation.css'
import Loader from 'react-loader-spinner'
import QRCode from 'qrcode.react'

export class Donation extends Component {

    // TODO
    constructor(props) {
        super(props)

        this.state = {
            donationAmount: 0,
            name: 'anonymous',
            phoneNo: '',
            message: '',
            intentUrl: ''
        }

        this.generateQr = this.generateQr.bind(this)
    }

    // TODO
    componentDidMount() {

    }

    // Generate QR Code based on amount
    generateQr(e) {
        this.setState({
            'intentUrl': `upi://pay?pa=ashsweet119@okaxis&pn=test&am=${e.target.value}&tn=Test_Transaction`
        })
    }

    render(){
        return(
            <div className='outer'>
                <header className='flex-item'>
                    💰 Donate Us
                </header>

                <div className='row'>
                    <QRCode value={this.state.intentUrl} />
                </div>

                

                <b> Click Here to directly open the app  </b>
                <a href={this.state.intentUrl}> {this.state.intentUrl} </a>
                <br />
                Amount: <input type='text' onChange={this.generateQr} />
            </div>
        )
    }

}