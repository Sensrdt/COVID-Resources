import React, {Component} from 'react';
import './List.css';
import moment from 'moment'

export class List extends Component {
  getLocation = () => {
      if(this.props.city==="" && this.props.state==="" && this.props.district===""){
          return "";
      }else{
          return(
        <p>
            {"🌎  "}&nbsp;<b>Location</b>:&nbsp;
            {this.props.district!==""?`${this.props.district} ,`:""}
            
            {this.props.city !==""?`${this.props.city} ,`:"" }
            
            {this.props.state}{' '}
        </p>
          )

      }
  }
  render() {
    return (
      <React.Fragment>
        <div className='list-main-class'>
          <div className={'rating'}>
            {this.props.verified
              ? <p className={"tick-verified"}>✔ Verified</p>
              : ""}

            {/* <p
							onClick={() => {
								this.props.onReport(this.props.uid);
							}}>
							Rating
						</p> */}
          </div>
          <p className={"type-p"}>
            {"📋  "}&nbsp;
            <b>Type</b>
            : {this.props.type}</p>

            {this.getLocation()}
          

          {/* <p>
                        <b>District</b>
                         : {this.props.district===""?"Not available":this.props.district}
                         </p>
                          */}
          {this.props.area !== ""
            ? <p>{"🏠  "}&nbsp;<b>Area</b>: {this.props.area}</p>
            : ""}

          {/* <p>
                        <b>Quantity & Amount</b>
						 : {this.props.quantity} & {this.props.amount}{' '}
					</p> */}
          <p>{"📱 "}&nbsp;<b>Contact Number</b>
            : {this.props.ox_contact}</p>

          <p className='name'>{"👨  "}&nbsp;<b>Dealer / Supplier</b>: {this.props.name}</p>
{/*        
          <div className={"amount"}>

            
{"#️⃣ "}&nbsp; <p>{this.props.quantity===undefined || this.props.quantity==="undefined" ||this.props.quantity===""|| this.props.quantity === 0 ||
this.props.quantity==="Unknown. " || this.props.quantity==="Unknown." || this.props.quantity==="Unknown"|| this.props.quantity==="Not specified"?

   `   NA  `: `   ${this.props.quantity}` 
   }</p>&nbsp;

&nbsp;{"💰 "}&nbsp; <p>{this.props.amount===""|| this.props.amount === 0 || this.props.amount==="Not specified"? 
   `   NA  `: `   ${this.props.amount} ` 
   }</p>

</div> */}

          <p className={'updated'}>
            {"⏱️  "}&nbsp;
            {/* <b>Updated</b> */}
             {moment(this.props.updated_on).format("dddd, MMMM Do, h:mm a")}</p>

    
        
          {this.props.delete
            ? <p className={"remove"} onClick={() => this.props.onDelete(this.props.ukey)}>Delete</p>
            : ""}

        </div>
      </React.Fragment>
    );
  }
}

export default List;
