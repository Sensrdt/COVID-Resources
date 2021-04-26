import React, { Component } from 'react'
import './DetailsUpload.css'
export class DetailsUpload extends Component {
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
                    <label htmlFor="phone">Phone number:</label>
                    <input type="phone" id="phone" name="phone" />
                   
                    <label>Verified:</label>
                    <input type="radio" id="under_13" defaultValue="under_13" name="user_age" /><label htmlFor="under_13" className="light">Yes</label><br />
                    <input type="radio" id="over_13" defaultValue="over_13" name="user_age" /><label htmlFor="over_13" className="light">No</label>
                  </fieldset>
                  <fieldset>  
                    <legend><span className="number">2</span> Location</legend>
                   
                    <label htmlFor="job">State:</label>
                    <select id="job" name="user_job" className={"custom-select"}>
                     
                        <option value="frontend_developer">Front-End Developer</option>
                        <option value="php_developer">PHP Developer</option>
                        <option value="python_developer">Python Developer</option>
                        <option value="rails_developer">Rails Developer</option>
                        <option value="web_designer">Web Designer</option>
                        <option value="wordpress_developer">Wordpress Developer</option>
                    
                     
                    </select>


                    <label htmlFor="job">City:</label>
                    <select id="job" name="user_job" className={"custom-select"}>
                     
                        <option value="frontend_developer">Front-End Developer</option>
                        <option value="php_developer">PHP Developer</option>
                        <option value="python_developer">Python Developer</option>
                        <option value="rails_developer">Rails Developer</option>
                        <option value="web_designer">Web Designer</option>
                        <option value="wordpress_developer">Wordpress Developer</option>
                    
                     
                    </select>


                    <label htmlFor="job">District:</label>
                    <select id="job" name="user_job" className={"custom-select"}>
                     
                        <option value="frontend_developer">Front-End Developer</option>
                        <option value="php_developer">PHP Developer</option>
                        <option value="python_developer">Python Developer</option>
                        <option value="rails_developer">Rails Developer</option>
                        <option value="web_designer">Web Designer</option>
                        <option value="wordpress_developer">Wordpress Developer</option>
                    
                     
                    </select>


                    <label htmlFor="area">Area:</label>
                    <input type="text" id="area" name="area" />
                   
                  </fieldset>
                  <center>
                  <button type="submit">Submit</button>

                  </center>
                </form>
              </div>
            </div>
          </div>
        
        )
    }
}

export default DetailsUpload
