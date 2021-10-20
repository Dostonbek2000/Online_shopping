import React, { useState, useEffect } from "react";
import { Container, Paper,  Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { TextField } from "@mui/material";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useStyles } from "./style";
import { Link,Redirect } from "react-router-dom";
import axios from 'axios';
import jwt from "jwt-decode";

import { ToastContainer, toast, Bounce } from "react-toastify";


const handleImage = (e) => { };
function UploadButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
}



const EditProfile = (props) => {
  

  
 const data = JSON.parse(localStorage.getItem('MyProfile'))
 console.log("data local",data);
  const classes = useStyles();
  const [username, setusername] = useState(data.username);
  const [password, setpassword] = useState(data.password);
  const [role, setrole] = useState(data.role);
  const [phone, setphone] = useState(data.phone)
  const [media, setmedia] = useState(data.media);
  const [address, setaddress] = useState(data.address);
  const [title, settitle] = useState(data.title)
  const [desc, setdesc] = useState(data.desc);
  const [active, setActive] = useState(true);

  const token = localStorage.getItem('token')
  
    const handleClick = async (e) => {
    setActive(active);
      const DATA = {
        inn: 0,
        active: true,
        media: media,
        username: username,
        password: password,
        phone: phone,
        address:address,
        title: title,
        role: role,
        desc: desc,
        

    }
      try {
        const res = await axios.put(
          `http://localhost:8000/api/${jwt(token).role}/accounts/${jwt(token).id}`,
          DATA,
          {
            headers: {
              token: token,
            },
          }
        );
        handleClick();
        
      } catch (error) {
        console.log(error);
        toast("Error at Editing Profile", {
          className: "error",
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
  return (
    <>
      <Container fluid='true' maxWidth="md" className={classes.wrapper}>
        <form action="#" className={classes.root} autoComplete="on">
          <Paper elevation={0} className={classes.paper}>
            <Typography
              variant="h2"
              style={{
                textAlign: "center",
                fontFamiliy: '"Roboto" san-serif',
                color: "black",
              }}
            >
              My Profile
            </Typography>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
            style={{width:'100%'}}
            placeholder="Title"
              type="text"
              onChange={(e)=>settitle(e.target.value)}
            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
            style={{width:'100%'}}
            placeholder="Role"
              type="text"
              onChange={(e)=>setrole(e.target.value)}
            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
            style={{width:'100%'}}
            placeholder="Phone"
              type="text"
              onChange={(e)=>setphone(e.target.value)}

            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
            style={{width:'100%'}}
            placeholder='Username'
              type="text"
              onChange={(e)=>setusername(e.target.value)}

            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
            style={{width:'100%'}}
            placeholder='Password'
              type="text"
              onChange={(e)=>setpassword(e.target.value)}

            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
            style={{width:'100%'}}
              placeholder='Address'
              type="text"
              onChange={(e)=>setaddress(e.target.value)}

            />
          </Paper>
          <Paper className={classes.paper} elevation={0}>
            <TextField
            style={{width:'100%'}}
             type="file"
             onChange={(e)=>setmedia(e.target.files[0])}
            />
          
          </Paper>
          <Paper className={classes.paper} elevation={0}>
            <TextareaAutosize
            maxRows={3}
              aria-label="maximum height"
              variant="outlined"
              placeholder="Qo'shimcha ma'lumotlar..."
              onChange={(e)=>setdesc(e.target.value)}
              style={{
                width: "100%",
                height: "80px",
                borderRadius: "8px",
                fontFamily: "Roboto",
                fontSize: "20px",
                color: "black",
                fontWeight: "800",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            />
          </Paper>

          <Paper className={classes.buttonGroup} elevation={0}>
            <Button
              component={Link}
              to={"/setting"}
              variant="contained"
              fullWidth
              type="submit"
              onClick={handleClick}
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Button
              component={Link}
              to={"/setting"}
              variant="contained"
              fullWidth
              type="reset"
              onChange={handleClick}
              color="secondary"
              size="large"
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Paper>
        </form>
      </Container>
    </>
  );
};

export default EditProfile;
