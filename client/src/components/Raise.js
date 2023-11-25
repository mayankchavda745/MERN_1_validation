import axios from 'axios';
import React, {useState} from 'react';
function Raise() {

  // initialize the component state 
  const [obj,setObj] = useState({
    email:'',name:'',type:'',issue_description:''
  });

  /**
   * 
   * @param {input on change event} e
   * store the values in the state fields
   * get name, value of the input elements from event target to update the state
   */ 
  const handleChange = (e) => {
    // for input type number, set the value as integer
    setObj(p=>({...p,[e.target.name]:e.target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/requests',{
      email:obj.email,name:obj.name,type:obj.type,issue_description:obj.issue_description
    })
    .then(res=>{
      alert(res.data.message);
      setObj({
        email:'',name:'',type:'',issue_description:''
      });
    })
    .catch(err=>{
       err.response.data.message && alert(err.response.data.message);
      err.response.data.error && alert(err.response.data.error);
      //alert(err.response.data);
      setObj({
        email:'',name:'',type:'call',issue_description:''
      });
    });
  }
  /**
   * To raise request
   * use API POST: http://localhost:8000/requests
   */

  return (
    <div className="m-5">
      <div className="form-card" style={{ width: "50%" }}>
        <div className="title">
          Raise a new request
        </div>
        { /** bind your form state variables to form input fields and onchange event should call 'handleChange' fn */}
        <form>
          <div className="form-group my-3">
            <input type="email" name="email" value={obj.email} onChange={handleChange} placeholder="Email" className="form-control" data-testid="input-email" />
          </div>
          <div className="form-group my-3">
            <input type="text" name="name" value={obj.name} onChange={handleChange} placeholder="Name" className="form-control" data-testid="input-name"/>
          </div>
          <div className="form-group my-3">
            <select className="form-control" name="type" value={obj.type} onChange={handleChange} data-testid="input-type">
              <option value="" disabled>Select the type</option>
              <option value="call">call</option>
              <option value="data">data</option>
              <option value="message">message</option>
              <option value="others">others</option>
            </select>
          </div>
          <div className="form-group my-3">
            <textarea name="issue_description" value={obj.issue_description} onChange={handleChange} placeholder="Issue Description" className="form-control"  data-testid="input-issue_description"/>
          </div>
          <button type="button" onClick={handleSubmit} className="btn btn-info btn-submit mt-2" data-testid="raise-btn">Raisse</button >
        </form>
      </div>
    </div>
  );

}

export default Raise;