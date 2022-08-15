import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button,Grid, Input } from "@mui/material";
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

// const bull = (
//     <Box
//       component="span"
//       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//        •
//     </Box>
//   );
  

const WardenApplication = (props) => {
  const [userdata, setUserdata] = useState([{id:'0'}]);
  const [show, setShow] = useState(false);
  const [AcceptOpen, setAcceptOpen] = useState(false);
  const [RejectOpen, setRejectOpen] = useState(false);
  const [asked, setAsked] = useState([{id : '0'}]);
  const [reason, setReason] = useState("");
console.log(asked);
console.log("typeof data"+userdata[userdata.findIndex(x => x.id ===asked.id)]);

  const paras = useParams();
  const Name = paras.name;
  console.log("Check1"+Name);
  useEffect(()=>{
      axios.get("http://localhost:3001/warden").then((res) =>{
      console.log(res.data);
     setUserdata(res.data);
  })
  }, []);
  useEffect(()=>{
    // axios.get("http://localhost:8080/facultyapplications").then((res) =>{
    //   console.log(res.data);
    //  setUserdata(res.data);})
  },[show])
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
      { field: 'Name', headerName: 'Name', minWidth: 150,},
      { field: 'Branch', headerName: 'Branch', minWidth: 50,},
      { field: 'Section', headerName: 'Section',minWidth: 50, },
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
      <Card variant="outlined"><CardContent>
      <Typography variant='h4' sx = {{justifyContent:"center"}}>Student Details</Typography>
        <Grid container sx={{justifyContent:"space-evenly", paddingTop:"5%"}}>
        <Grid item sx={6}>
        <Typography>
                  Registration_no : {asked.id} 
                  </Typography>
                  <Typography>Name : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].Name}</Typography>
                  <Typography>Branch : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].Branch}</Typography>
                  <Typography>Section : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].Section}</Typography>
        </Grid>
        <Grid item sx= {6}>
        <Typography>OutDate : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].outdate}</Typography>
                <Typography>OutTime : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].outtime}</Typography>
                <Typography>InDate : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].indate}</Typography>
                <Typography>destination : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].destination}</Typography>
                <Typography>facultyAcceptStatus : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].facccept}</Typography>
                <Typography>wardenAcceptStatus : {(typeof(userdata[userdata.findIndex(x => x.id ===asked.id)])=="undefined")?"undefined":userdata[userdata.findIndex(x => x.id ===asked.id)].waraccept}</Typography> 
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
                  axios.post("http://localhost:3001/wardenresult",{
                    rejectionreason:"null",
                    waraccept: "yes",
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
                  axios.post("http://localhost:3001/wardenresult",{
                    rejectionreason:reason,
                    waraccept: "no",
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
};

export default WardenApplication;