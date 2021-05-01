import React, { Component } from 'react';
import './List.css';
import moment from 'moment';

export class List extends Component {
  getLocation = () => {
    if (this.props.city === '' && this.props.state === '' && this.props.district === '') {
      return '';
    } else {
      return (
        <p>
          {'🌎  '}&nbsp;<b>Location</b>:&nbsp;
          {this.props.district !== '' ? `${this.props.district} ,` : ''}
          {this.props.city !== '' ? `${this.props.city} ,` : ''}
          {this.props.state}{' '}
        </p>
      );
    }
  };
  getLabel = (type) => {
    if (type === 'Meals' || type === 'Helpline') {
      return 'Provider';
    }
    if (type === 'ICU Bed' || type === 'Bed') {
      return 'Center:';
    }
    if (type === 'Volunteers') {
      return 'Volunteer:';
    }
    if (type === 'Plasma') {
      return 'Donour:';
    }
    return 'Dealer / Supplier:';
  };
  render() {
    return (
      <React.Fragment>
        <div className="list-main-class" id={this.props.ukey + '==' + this.props.phone.slice(-4)}>
          <div className={'rating'}>
            {this.props.verified ? <p className={'tick-verified'}>✔ Verified</p> : ''}

            {/* <p
							onClick={() => {
								this.props.onReport(this.props.uid);
							}}>
							Rating
						</p> */}
          </div>
          <p className={'type-p'}>
            {'📋  '}&nbsp;
            <b>Type</b>: {this.props.type}
          </p>

          {this.getLocation()}

          {/* <p>
                        <b>District</b>
                         : {this.props.district===""?"Not available":this.props.district}
                         </p>
                          */}
          {this.props.area !== '' ? (
            <p>
              {'🏠  '}&nbsp;<b>Area</b>: {this.props.area}
            </p>
          ) : (
            ''
          )}

          {/* <p>
                        <b>Quantity & Amount</b>
						 : {this.props.quantity} & {this.props.amount}{' '}
					</p> */}
          <p>
            {'📱 '}&nbsp;<b>Contact Number</b>: {this.props.ox_contact}
          </p>

          <p className="name">
            {'👨  '}&nbsp;<b>{this.getLabel(this.props.type)}</b>: {this.props.name}
          </p>

          {this.props.active_hours !== '' && (
            <p className="name">
              {'⌚  '}&nbsp;<b>Active hours</b>: {this.props.active_hours}
            </p>
          )}

          {this.props.type === 'Meals' ? (
            this.props.cost !== '' ? (
              <p>
                {'💰  '}&nbsp;{this.props.cost}
              </p>
            ) : (
              'NA'
            )
          ) : (
            ''
          )}

          <p className={'updated'}>
            {'⏱️  '}&nbsp;
            {/* <b>Updated</b> */}
            {moment(this.props.updated_on).format('dddd, MMMM Do, h:mm a')}
          </p>

          {this.props.delete ? (
            <p className={'remove'} onClick={() => this.props.onDelete(this.props.ukey)}>
              {'🗑️  '}&nbsp;Delete
            </p>
          ) : (
            ''
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default List;
