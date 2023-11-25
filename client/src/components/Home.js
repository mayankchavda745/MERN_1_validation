import axios from "axios";
import React,{useState,useEffect} from "react";

function Home() {
  // initialize the component state
  const [obj,setObj] = useState({
    flag:false,flag1:false,data:[],id:null,status:'',comment:''
  });

  /**
   * To fetch data from the backend using API request
   * Use API url : http://localhost:8000/requests : GET
   * Set the response in state
   */
  useEffect(()=>{
    axios.get('http://localhost:8000/requests')
    .then(res=>{
      setObj(p=>{
        return {
          ...p,data:res.data.requests
        }
      });
    });
  },[obj.flag1]);

  /**
   *
   * @param {input on change event} e
   * store the values in the state fields
   * get name, value of the input elements from event target to update the state
   */
  const handleChange = (e) => {
   // console.log({val:e.target.value,id:e.target.id});
    setObj(p=>({...p,flag:true,id:e.target.id,status:e.target.value}));
  };

  const handleBack = () => {
  // console.log({comment:obj.comment});
   setObj(p=>({...p,flag:false}));
  }

  const handleStatus = () => {
    axios.patch(`http://localhost:8000/requests/${obj.id}`,{
      status:obj.status,comment:obj.comment
    }).then(res=>{
      alert(res.data.message);
      setObj(p=>({...p,flag1:!obj.flag1,status:'',comment:'',flag:false,id:null}));
    }).catch(err=>{
      alert(err.response.data.message);
      setObj(p=>({...p,status:'',comment:'',flag:false,id:null}));
    });
  }
  return (
    <div>
      <div className="mt-5 mx-3">
        {/* show the following div template only on change the status field dropdown along with the request details */}
       {obj.flag ?  <div data-testid="update-view">
          <label>Enter comments: </label>
          <textarea
            className="form-control my-3"
            data-testid="input-comments"
            value={obj.comment} onChange={(e)=>setObj(p=>({...p,comment:e.target.value}))}
          ></textarea>
          <button className="btn btn-dark" data-testid="change-status-btn" onClick={handleStatus}>
            Change Status
          </button>
          <button className="btn btn-dark ml-3" data-testid="back-btn" onClick={handleBack}>
            Back
          </button>
        </div> :

        <div data-testid="requests-view">
          <table className="table table-light table-sm caption-top table-bordered">
            <caption>Requests</caption>
            <thead>
              <tr className="table-dark">
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Status</th>
                <th>Raised On</th>
                <th>Issue Description</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {/* iterate the request details in the following div to display */}
             {obj.data.map((d,i)=> <tr key={i} data-testid="requests-data">
                <td>{/* index starts from 1 */i+1}</td>
                <td>{/* {name} */d.name}</td>
                <td>{/* {email} */d.email}</td>
                <td>{/* {type} */d.type}</td>
                <td>
                  {/* bind the {status} field in the dropdown value */}
                  <select data-testid="input-status" name="status" id={d._id} value={d.status} onChange={handleChange}>
                    <option value="" disabled>
                      By status
                    </option>
                    <option value="new">new</option>
                    <option value="resolved">resolved</option>
                    <option value="in-progress">in-progress</option>
                    <option value="rejected">rejected</option>
                  </select>
                </td>
                <td>{/* {raised_on} */new Date(d.raised_on).getDate()}/{new Date(d.raised_on).getMonth()+1}/{new Date(d.raised_on).getFullYear()}</td>
                <td>{/* {issue_description} */d.issue_description}</td>
                <td>
                  {/* if {comment} is empty, display "No comments yet" else display the {comment} */
                  !d.comment?"No comments yet":d.comment}
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>}
      </div>
    </div>
  );
}

export default Home;