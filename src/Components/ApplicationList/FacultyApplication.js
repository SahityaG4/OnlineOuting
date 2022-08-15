import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid, Input,TextField} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Faculty from "../../Images/Faculty.jpeg";
import { Paper, makeStyles } from "@material-ui/core";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

const FacultyApplication = () => {

  const handleFacultyLogin = () => {
    setFacultyExpanded(false);
    // e.preventDefault()
  
    axios.post("http://localhost:3001/facultylogin",{
        facid:FacultyName,
        password:FacultyPassword 
               
      }).then((response)=>{
       // e.preventDefault();
       console.log(response);
       if(response.data.message){
        // setStatus(response.data.message)
    }
    else{
        // setStatus(response.data[0].userid)
        // navigate("/facultyApplication")
    }
      })
  };
  const [FacultyName, setFacultyName] = useState("");
  const [FacultyPassword, setFacultyPassword] = useState("");
  const [Facultyexpanded, setFacultyExpanded] = React.useState(false);
  const [notLoginStatus, setnotLoginStatus] = useState(true);
  const [userdata, setUserdata] = useState([{id:'0'}]);
  const [userdetails,setuserdetails]=useState([])
  const [show, setShow] = useState(false);
  const [AcceptOpen, setAcceptOpen] = useState(false);
  const [RejectOpen, setRejectOpen] = useState(false);
  const [asked, setAsked] = useState([{id : '0'}]);
  const [reason, setReason] = useState("");
  const classes = useStyles();

console.log(asked);
console.log("typeof data"+userdata[userdata.findIndex(x => x.id ===asked.id)]);

  useEffect(()=>{
      axios.get("http://localhost:3001/faculty").then((res) =>{
      console.log(res.data);
     setUserdata(res.data);
  })
  }, []);
  useEffect(()=>{
    axios.post("http://localhost:8080/history").then((response)=>{
         setuserdetails(response.data)
        console.log(response.data)
    })
},[show])
  useEffect(()=>{
    // axios.get("http://localhost:8080/facultyapplications").then((res) =>{
    //   console.log(res.data);
    //  setUserdata(res.data);})
  },[show])
      // const handleAcceptOpen = (params) =>{
      //   setAsked(params);
      //   console.log(userdata[0].Branch)
      //   setAcceptOpen(true);
      // }
      const handleAcceptClose = () => {
        setAcceptOpen(false);
      };
      const handleRejectClose = () => {
        setRejectOpen(false);
      };
        const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
  const columns =[
      { field: 'id', headerName: 'id', minWidth: 150, },
      { field: 'outdate', headerName: 'Out Date', minWidth: 150,},
      { field: 'outtime', headerName: 'Out Time', minWidth: 50,},
      { field: 'indate', headerName: 'intime',minWidth: 50, },
      {
          field: 'col6',
          headerName: 'Details',
          width: 150,
          renderCell: (params) => {return (
              <strong>
                  <Button
                      variant="contained"
                      size="medium"
                      style={{ marginLeft: 16 }}
                      onClick={()=>{
                        setAsked(params);
                        setShow(true)
                    }} 
                  >
                      View More
                  </Button>
              </strong>
          )},
          // disableClickEventBubbling: true,
          }
  ]
    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <Card sx={{ maxWidth: 345 }}>
      <CardHeader title="Faculty Login" />
      <CardMedia
        component="img"
        height="194"
        image={Faculty}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <Button
          expand={Facultyexpanded}
          aria-expanded={Facultyexpanded}
          onClick={()=>{
            setFacultyExpanded(true);
          }}
        >
          Submit
        </Button>
      </CardActions>
      <Collapse in={Facultyexpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Paper className={classes.pageContent}>
              <Grid container>
                <Grid>
                  <TextField
                    sx={{ paddingBottom: 3 }}
                    variant="outlined"
                    label="Name"
                    value={FacultyName}
                    onChange={(e)=>{
                      setFacultyName(e.target.value);
                    }}
                  />
                  <TextField
                    type="password"
                    variant="outlined"
                    label="Password"
                    value={FacultyPassword}
                    onChange={(e)=>{
                      setFacultyPassword(e.target.value);
                    }}
                  />
                </Grid>
                <Button
                size="small"
                sx={{ fontSize: "0.85rem" }}
                variant="contained"
                 onClick={handleFacultyLogin}>
                    Login
                </Button>
                <Button onClick={()=>{
                  setFacultyExpanded(false)
                }}>
                  Close
                </Button>
              </Grid>
          </Paper>
        </CardContent>
      </Collapse>
    </Card>
          <div style={{ height: 400, width: 650 }}>
        <DataGrid
        rows={userdata}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      </div>
      {show && <div style={{paddingTop: "5%"}}>
        <Box sx={{ minWidth: 500}}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant='h4' sx = {{justifyContent:"center"}}>Student Details</Typography>
        <Grid container sx={{justifyContent:"space-evenly", paddingTop:"5%"}}>
        <Grid item sx={6}>
        <Typography>
                  Registration_no : {asked.id} 
                  
                  </Typography>
                  <Typography>OutTime : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].outtime}</Typography>
                  <Typography>OutDate : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].outdate}</Typography>
                <Typography>InDate : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].indate}</Typography>
                <Typography>destination : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].destination}</Typography>
                <Typography>facultyAcceptStatus : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].facccept}</Typography>
                <Typography>wardenAcceptStatus : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].waraccept}</Typography> 
                  
        </Grid>
        <Grid item sx= {6}>
        <table className="ui celled table">
  <thead>

    <tr>
    <th>S.no</th>
    <th>outdate</th>
    <th>indate</th>
    
  </tr></thead>
  <tbody>
    {userdetails.map((item)=>{
        return(
            <tr>
            <td>{userdetails.indexOf(item)+1}</td>
            <td data-label="Id">{item.outdate}</td>
            <td data-label="Name">{item.indate}</td>
          </tr>
         
        )
    }) }
    
  </tbody>
</table>
        </Grid> 
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={()=>{
            setAcceptOpen(true)
        }}>Allow</Button>
        <Button onClick={()=>{
            setRejectOpen(true)
        }}>Reject</Button>
      </CardActions></Card>
    </Box>
        </div>}
      <div style={{ display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '2%' }}>
              <Dialog
            fullScreen={fullScreen}
              open={AcceptOpen}
              onClose={handleAcceptClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
               Confirmation
              </DialogTitle>
              <DialogContent>
              <Typography>Are you Sure you want to give outing?</Typography>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={()=>{
                  axios.post("http://localhost:3001/facultyresult",{
                    rejectionreason:"null",
                    facaccept: "yes",
                    id: asked.id
                  }).then((res) =>{});
                  setAcceptOpen(false)
                }}>
                  Yes
                </Button>
                <Button onClick={()=>setAcceptOpen(false)}>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div style={{ display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '2%' }}>
              <Dialog
            fullScreen={fullScreen}
              open={RejectOpen}
              onClose={handleRejectClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
               Confirmation
              </DialogTitle>
              <DialogContent>
              <Typography>Are you Sure you want to reject?</Typography>
              </DialogContent>
              <DialogActions>
              <Input
              type="text"
              placeholder="Reasons for rejection"
              onChange={(e) => {
                setReason(e.target.value)
              }}
              sx={{ color: "rgba(0, 0, 0, 0.6)", fontSize: "1.1rem" }}
              disableUnderline
            />
                <Button variant="contained" onClick={()=>{
                  console.log(asked.id + "hello")
                  axios.post("http://localhost:3001/faculty",{
                    rejectionreason:reason,
                    facaccept: "no",
                    id: asked.id
                  }).then((res) =>{});
                  setRejectOpen(false)
                }}>
                  Yes
                </Button>
                <Button onClick={()=>setRejectOpen(false)}>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
    );
}
export default FacultyApplication