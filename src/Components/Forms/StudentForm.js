import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {

const[id,setid]=useState('')
const[name,setname]=useState('')
const[mmobile,setmmobile]=useState('')
const[fmobile,setfmobile]=useState('')
const[outdate,setoutdate]=useState('')
const[outtime,setouttime]=useState('')
const[destination,setdestination]=useState('')
const[indate,setindate]=useState('')
const[reason,setreason]=useState('')
const submit=(e)=>{
  e.preventDefault()
    axios.post("http://localhost:3001/Success",{
        id:id,
        name:name,
        mmobile:mmobile,
        fmobile:fmobile,
        outdate:outdate,
        outtime:outtime,
        destination:destination,
        indate:indate,
        reason:reason,
        
      }).then((response)=>{
      })

  };
  return (
    <div>
      <div className="form" >
        <div  className='ui cards'>
          <form className="ui form" onSubmit={submit}>
            <div className=' wide field'>
              <input type="text" name="userid" placeholder='id'  onChange={(event)=>{
                setid(event.target.value)
              }}/>
            </div>
           
            <div className="fields">
              <div className="field">
                <input type="text" placeholder='name' onChange={(event)=>{
                  setname(event.target.value)
                }} />
              </div>
              
              </div>
              <div className="fields">
              <div className="field">
                <input type="text" placeholder='mmobile' onChange={(event)=>{
                  setmmobile(event.target.value)
                }} />
              </div>
              
              </div>
              <div className="fields">
              <div className="field">
                <input type="text" placeholder='fmobile' onChange={(event)=>{
                  setfmobile(event.target.value)
                }} />
              </div>
              
              </div>
              
              <div className="fields">
              <div className="field">
                <input type="date" placeholder='outdate' onChange={(event)=>{
                  setoutdate(event.target.value)
                }} />
              </div>
              
              </div>
            
              <div className="fields">
              <div className="field">
                <input type="text" placeholder='outtime' onChange={(event)=>{
                  setouttime(event.target.value)
                }} />
              </div>
              
              </div>
              <div className="fields">
              <div className="field">
                <input type="text" placeholder='destination' onChange={(event)=>{
                  setdestination(event.target.value)
                }} />
              </div>
              
              </div> 

              <div className="fields">
              <div className="field">
                <input type="date" placeholder='indate' onChange={(event)=>{
                  setindate(event.target.value)
                }} />
              </div>
              
              </div>
              <div className="fields">
              <div className="field">
                <input type="text" placeholder='reason' onChange={(event)=>{
                  setreason(event.target.value)
                }} />
              </div>
              
              </div>

              {/* <button className='ui orange button' onClick={()=>{notify()}}>Login</button> */}
              <button className='ui blue button'>Submit</button>

              
          </form>
          
          
        </div>
        
      </div>
    </div>
  );
};

export default StudentForm;