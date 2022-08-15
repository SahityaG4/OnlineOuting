import React, { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { NavLink, Outlet } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Student from "../../Images/Student.jpeg";
import { Grid, TextField } from "@mui/material";
import { Paper, makeStyles } from "@material-ui/core";
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(3),
      padding: theme.spacing(3),
    },
  }));

const StudentApplication = (props) => {
  const [userdata, setUserdata] = useState([{id:'0'}]);
  const [Studentexpanded, setStudentExpanded] = React.useState(false);
  const [notLoginStatus, setnotLoginStatus] = useState(true);
  const [show, setShow] = useState(false);
  const [StudentName, setStudentName] = useState("");
  const [StudentPassword, setStudentPassword] = useState("");

  const classes = useStyles();

  const handleStudentLogin = () => {
    
    axios.post("http://localhost:3001/studentlogin",{
      userid:StudentName,
      password:StudentPassword 
    }).then((response)=>{
      if(response.data.message){
        setnotLoginStatus(true)
      }else{
        setnotLoginStatus(false)
        setStudentExpanded(false)
        setShow(true)
      }
    })
    
  };

  useEffect(()=>{
    axios.post("http://localhost:3001/displaystudent",{
      userid: StudentName
    }).then((res) =>{
      console.log(res.data);
     setUserdata(res.data);
  })
  }, [notLoginStatus]);

    
  const columns =[
      { field: 'id', headerName: 'id', minWidth: 100, },
      { field: 'outdate', headerName: 'OutDate', minWidth: 50,},
      { field: 'outtime', headerName: 'OutTime', minWidth: 50,},
      { field: 'indate', headerName: 'inDate',minWidth: 50, },
      { field: 'facaccept', headerName: 'facultyAcceptStatus',minWidth: 200, },
      { field: 'waraccept', headerName: 'wardenAcceptStatus',minWidth: 200, },
      { field: 'rejectionreason', headerName: 'reason',minWidth: 200, }
  ]
    return (
        
        <div style={{display: "flex", justifyContent: "space-evenly", paddingTop:"5%"}}>
            <Card sx={{ maxWidth: 345 }}>
      <CardHeader title="Student Login" />
      <CardMedia
        component="img"
        height="194"
        image={Student}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <Button
          expand={Studentexpanded}
          aria-expanded={Studentexpanded}
          onClick={()=>{
            setStudentExpanded(true);
          }}
        >
          Submit
        </Button>
      </CardActions>
      <Collapse in={Studentexpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Paper className={classes.pageContent}>
              <Grid container>
                <Grid>
                  <TextField
                    sx={{ paddingBottom: 3 }}
                    variant="outlined"
                    label="Name"
                    value={StudentName}
                    onChange={(e)=>{
                      setStudentName(e.target.value);
                    }}
                  />
                  <TextField
                    type="password"
                    variant="outlined"
                    label="password"
                    value={StudentPassword}
                    onChange={(e)=>{
                      setStudentPassword(e.target.value);
                    }}
                  />
                </Grid>
                <Button size="small"
              sx={{ fontSize: "0.85rem" }}
              variant="contained" onClick={handleStudentLogin}>
                    Login
                </Button>
                <Button onClick={()=>{
                  setStudentExpanded(false)
                }}>
                  Close
                </Button>
              </Grid>
          </Paper>
        </CardContent>
      </Collapse>
    </Card>
        <div>
        <div style={{display:'flex', justifyContent:"center"}}>
          <div style={{ height: 400, width: 800 }}>
        <DataGrid
        rows={userdata}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      </div>
      </div>
      <div style={{display:'flex' ,justifyContent:"flex-end"}}>
        <NavLink style={{textDecoration:'none', color : 'white'}} to={`/Student/newApplication`}>
      <Button sx={{ my: 2, color: 'white', display: 'block' }} variant="contained" size="large">
        Apply new
      </Button>
      </NavLink>
      {!notLoginStatus && <Button onClick={()=>{
        setStudentName("")
        setStudentPassword("")
        setShow(false)
        setnotLoginStatus(true)
      }} sx={{ my: 2, color: 'white', display: 'block' }} variant="contained" size="large">
        LogOut
      </Button>}
      </div>
      <div>
        {show && <Outlet />}
      </div>
      </div>
      </div>
    );
}
export default StudentApplication