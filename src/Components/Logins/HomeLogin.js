import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

import Warden from "../../Images/x.jpeg";
import { Grid, TextField } from "@mui/material";
import { Paper, makeStyles } from "@material-ui/core";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

export default function RecipeReviewCard() {
  const navigate=useNavigate()
  const [Wardenexpanded, setWardenExpanded] = React.useState(false);
  const [WardenStatus, setWardenStatus] = useState(null);
  const classes = useStyles();

  const [FacultyName, setFacultyName] = useState("");
  const [FacultyPassword, setFacultyPassword] = useState("");
  const [WardenName, setWardenName] = useState("");
  const [WardenPassword, setWardenPassword] = useState("");

  const handleWardenNameChange = (e) => {
    setWardenName(e.target.value);
  };
  const handleWardenPasswordChange = (e) => {
    setWardenPassword(e.target.value);
  };

  const handleWardenExpand = () => {
    setWardenExpanded(true);
  };


  const handleWardenLogin = () => {
    setWardenExpanded(false);
    axios.post("http://localhost:3001/wardenlogin",{
      warid:WardenName,
      password:WardenPassword 
    }).then((response)=>{
      if(response.data.message){
        // setStatus(response.data.message)
    }
    else{
        // setStatus(response.data[0].userid)
        navigate("/wardenApplication")
    }
    })
  };
  return (
    
    <div style={{display: "flex", justifyContent: "space-evenly", paddingTop:"10%"}}>
<CssBaseline/>
    
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title="Warden Login" />
      <CardMedia
        component="img"
        height="194"
        image={Warden}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <Button
          expand={Wardenexpanded}
          aria-expanded={Wardenexpanded}
          onClick={handleWardenExpand}
        >
          Submit
        </Button>
      </CardActions>
      <Collapse in={Wardenexpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Paper className={classes.pageContent}>
              <Grid container>
                <Grid>
                  <TextField
                    sx={{ paddingBottom: 3 }}
                    variant="outlined"
                    label="Name"
                    value={WardenName}
                    onChange={handleWardenNameChange}
                  />
                  <TextField
                    type="Password"
                    variant="outlined"
                    label="Password"
                    value={WardenPassword}
                    onChange={handleWardenPasswordChange}
                  />
                </Grid>
                <Button size="small"
              sx={{ fontSize: "0.85rem" }}
              variant="contained"
               onClick={handleWardenLogin}>
                    Login
                </Button>
                <Button onClick={()=>{
                  setWardenExpanded(false)
                }}>
                  Close
                </Button>
              </Grid>
          </Paper>
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
}
