import React, { Component } from 'react'
import './DetailsUpload.css'
import firebase from '../../config/firebase'
import wbcitylist from '../../Utils/WBList'
export class DetailsUpload extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             state: "",
             city: "",
             my_contact:"",
             user_verified: false
        }
        this.sendOtp = this.sendOtp.bind(this)
    }

    sendOtp(e){
        e.preventDefault();
        console.log(this.state.my_contact);
        var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha',{
            'size': 'invisible',
        });
        var number = '+91'+this.state.my_contact;

        // const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(number, recaptcha)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              var code = prompt('Enter the otp', '');

        
                if(code === null) return;

                
                confirmationResult.confirm(code).then( (result)=> {
                    
                    this.setState({user_verified:true})
                   
                }).catch(function (error) {
                    console.error( error);
                    
                });

              // ...
            }).catch((error) => {
              // Error; SMS not sent
              // ...
            });
        

       
    }
    
    render() {
        return (
            <div>
            <center><h2>Covid help</h2></center>
           
<div className={"refresh"}>
<p onClick={()=>this.props.history.push(`/`)}>Back to home</p>
<p onClick={()=>this.props.history.push(`/upload/oxygen`)}>Refresh</p>
</div>
           
           
            <div className="row">
              <div className="col-md-12">
                <form  method="post">
                
                  <fieldset>
                    <legend><span className="number">1</span> Your Basic Info</legend>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="user_name" />
                    <label htmlFor="phone">Oxygen phone number:</label>
                    <input type="phone" id="phone" name="phone" />

                    <label htmlFor="phone">Your phone number:</label>
                    <input type="phone" id="phone" name="phone" 
                    onChange={(e)=>{
                        console.log(e.target.value);
                        this.setState({my_contact: e.target.value})
                    }}
                    />
                    
                        <label htmlFor="otp">OTP</label>
                        <input type="text"/>
                        <button
                        onClick={this.sendOtp}
                        className={"verify-btn"} >Send otp</button>
                    
                   <br/>

                   <div className={"ox-verified"}>
                   <label>Verified:</label>
                    <input type="radio" id="under_13" defaultValue="under_13" name="user_age" /><label htmlFor="under_13" className="light">Yes</label><br />
                    <input type="radio" id="over_13" defaultValue="over_13" name="user_age" /><label htmlFor="over_13" className="light">No</label>
                   </div>
                   
                  </fieldset>
                  <fieldset>  
                    <legend><span className="number">2</span> Location</legend>
                   
                    <label htmlFor="state">State:</label>
                    <select id="state" name="state" className={"custom-select"}
                    disabled={!this.state.user_verified}
                    >
                     
                        <option value="West Bengal">West Bengal</option>
                     
                    </select>


                    <label htmlFor="city">City:</label>
                    <select id="city" name="city" className={"custom-select"}
                    disabled={!this.state.user_verified}
                    
                    >

                     {wbcitylist.map((city,key)=>{
                         return <option value={city} key={key}>{city}</option>

                     })}
                       
                    
                     
                    </select>


                    <label htmlFor="job">District:</label>
                    <input
                    disabled={!this.state.user_verified}
                    
                    type="text" id="district" name="district" />


                    <label htmlFor="area">Area:</label>
                    <input 
                    disabled={!this.state.user_verified}
                    
                    type="text" id="area" name="area" />
                   
                  </fieldset>
                  <center>
                  <button type="submit">Submit</button>

                  </center>
                </form>
              </div>
            </div>
            <div id="recaptcha"></div>

          </div>
        
        )
    }
}

export default DetailsUpload
