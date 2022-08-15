import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Admin from "../../Images/Faculty.jpeg";
import { Grid, TextField } from "@mui/material";
import { Paper, makeStyles } from "@material-ui/core";
import axios from 'axios';

import { CssBaseline } from '@mui/material';

const initialState = {
  id:"",
  ValidationPeriod: "",
  Name : "",
}

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));
const AdminForm = (props) => {
  const [Adminexpanded, setAdminExpanded] = React.useState(false);
  const [AdminStatus, setAdminStatus] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status,setStatus] = useState(false);
  const classes = useStyles();

  const [adminid, setadminid] = useState("");
  const [AdminPassword, setAdminPassword] = useState("");


  const handleadminidChange = (e) => {
    setadminid(e.target.value);
  };
  const handleAdminPasswordChange = (e) => {
    setAdminPassword(e.target.value);
  };

  const handleAdminExpand = () => {
    setAdminExpanded(true);
  };
  const handleAdminLogin = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/adminlogin",{
      adminid:adminid,
      password:AdminPassword 
      
    }).then((response)=>{
      if(response.data.message){
          // setStatus(response.data.message)
          setStatus(true)
          console.log("no")
      }
      else{
        setStatus(false)
        setIsLoggedIn(true)
        setAdminExpanded(false)
          console.log("authenticated")
      }
     
    })
  };

    const [TeacherData, setTeacherData] = useState(initialState)
    const [WardenData, setWardenData] = useState(initialState)
    return (
      <div style={{display:"flex", justifyContent:"space-evenly"}}>
<Card sx={{ maxWidth: 345 }}>
      <CardHeader title="Admin Login" />
      <CardMedia
        component="img"
        height="194"
        image={Admin}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <Button
          expand={Adminexpanded}
          aria-expanded={Adminexpanded}
          onClick={handleAdminExpand}
        >
          Submit
        </Button>
      </CardActions>
      <Collapse in={Adminexpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Paper className={classes.pageContent}>
              <Grid container>
                <Grid>
                  <TextField
                    sx={{ paddingBottom: 2 }}
                    variant="outlined"
                    label="Name"
                    value={adminid}
                    onChange={handleadminidChange}
                  />
                  <TextField
                    type="password"
                    variant="outlined"
                    label="password"
                    value={AdminPassword}
                    onChange={handleAdminPasswordChange}
                  />
                </Grid>
                <Button size="small"
              sx={{ fontSize: "0.85rem" }}
              variant="contained" onClick={handleAdminLogin}>
                    Login
                </Button>
                <Button onClick={()=>{
                  setAdminExpanded(false)
                }}>
                  Close
                </Button>
                {AdminStatus}
              </Grid>
          </Paper>
          {status && <h3 style={{color:"red"}}>Wrong password/ username</h3>}
        </CardContent>
      </Collapse>
    </Card>
      {isLoggedIn && <div style={{padding : 20}}>
            <div>
      <div className="form" >
        <div  className='ui cards'>
          <form className="ui form" >
          <div>Faculty Registration</div>
            <div className=' wide field'>
              <input type="text" name="Name" placeholder='Name'  onChange={(event)=>{
                setTeacherData({ ...TeacherData, Name : event.target.value})
              }}/>
            </div>
           
            <div className="fields">
              <div className="field">
              <input type="text" name="id" placeholder='id'  onChange={(event)=>{
                setTeacherData({ ...TeacherData, id : event.target.value})
              }}/>
              </div>
              
              </div>
              <div className="fields">
              <div className="field">
                <input type="text" placeholder='Validation period' onChange={(event)=>{
setTeacherData({ ...TeacherData, ValidationPeriod : event.target.value})                }} />
              </div>
              
              </div> 
              <button className='ui blue button' onClick={(e)=>{
                e.preventDefault()
                axios.post("http://localhost:3001/facultydetails",{
                  id: WardenData.id,
                  validationperiod : WardenData.ValidationPeriod,
                  name : WardenData.Name
                }).then((response)=>{
                 
                })
              }}>Register</button>
          </form>
          
          
        </div>
        
      </div>
    </div>
        </div>}
        {isLoggedIn && <div style={{padding : 20}}>
            <div>
      <div className="form" >
        <div  className='ui cards'>
          <form className="ui form" >
          <div>Warden Registration</div>
            <div className=' wide field'>
              <input type="text" name="Name" placeholder='Name'  onChange={(event)=>{
                setWardenData({ ...WardenData, Name : event.target.value})
              }}/>
            </div>
           
            <div className="fields">
              <div className="field">
              <input type="text" name="id" placeholder='id'  onChange={(event)=>{
                setWardenData({ ...WardenData, id : event.target.value})
              }}/>
              </div>
              
              </div>
              <div className="fields">
              <div className="field">
                <input type="text" placeholder='Validation period' onChange={(event)=>{
setWardenData({ ...WardenData, ValidationPeriod : event.target.value})                }} />
              </div>
              
              </div> 
              <button className='ui blue button'onClick={(e)=>{
                console.log( WardenData.id + WardenData.ValidationPeriod + WardenData.Name )
                e.preventDefault()
                axios.post("http://localhost:3001/wardendetails",{
                  name : WardenData.Name,
                  id: WardenData.id,
                  validationperiod : WardenData.ValidationPeriod

                  
                }).then((response)=>{
                   })
              }}>Register</button>
          </form>
          
          
        </div>
        
      </div>
    </div>
        </div>}
        </div>
    );
};

export default AdminForm;