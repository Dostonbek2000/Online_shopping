import React, { useState, useEffect } from "react";
import { Container, Paper, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { TextField } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useStyles } from "./style";
import { Link, Redirect } from "react-router-dom";
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



const EditProfile = () => {

  

  const data1 = JSON.parse(localStorage.getItem('MyProfile'))
  console.log("data local", data1);

  const { username, password, role, phone, media, address, title, desc } = data1;

  const classes = useStyles();
  const [username1, setusername] = useState(username);
  const [password1, setpassword] = useState(password);
  const [role1, setrole] = useState(role);
  const [phone1, setphone] = useState(phone)
  const [media1, setmedia] = useState(media);
  const [address1, setaddress] = useState(address);
  const [title1, settitle] = useState(title)
  const [desc1, setdesc] = useState(desc);
  const [active1, setActive] = useState(true);

  const token = localStorage.getItem('token')

  const handleClick = async (e) => {
    setActive(true);
    const DATA = {
      inn: 0,
      active: true,
      media: media1,
      username: username1,
      password: password1,
      phone: phone1,
      address: address1,
      title: title1,
      role: role1,
      desc: desc1,
    }
    
      await axios.put(
        `http://localhost:8000/api/${jwt(token).role}/accounts/${jwt(token).id}`,
        DATA,
        {
          headers: {
            token: token,
          },
        }
      );
      
    
  };
  return (
    <>
      <Container fluid='true' maxWidth="md" className={classes.wrapper}>
        <form action="#" className={classes.root} autoComplete="on">
          <Paper elevation={0} className={classes.paper}>
            <Typography
              variant="h3"
              style={{
                textAlign: "center",
                fontFamiliy: '"Roboto" san-serif',
                color: "black",
              }}
            >
              Edit my Profile
            </Typography>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
              style={{ width: '100%',marginTop:15 }}
              label="Title"
              variant='outlined'
              type="text"
              onChange={(e) => settitle(e.target.value)}
              value={title1}
            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
              style={{ width: '100%',marginTop:15 }}
              variant='outlined'
              label="Role"
              type="text"
              onChange={(e) => setrole(e.target.value)}
              value={role1}
            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
              style={{ width: '100%',marginTop:15 }}
              variant='outlined'
              label="Phone"
              type="text"
              value={phone1}
              onChange={(e) => setphone(e.target.value)}

            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
              style={{ width: '100%',marginTop:15 }}
              label='Username'
              variant='outlined'
              type="text"
              onChange={(e) => setusername(e.target.value)}
              value={username1}

            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
              style={{ width: '100%',marginTop:15 }}
              variant='outlined'
              label='Password'
              type="text"
              onChange={(e) => setpassword(e.target.value)}
              value={password1}

            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
              style={{ width: '100%',marginTop:15 }}
              label='Address'
              variant='outlined'
              type="text"
              onChange={(e) => setaddress(e.target.value)}
              value={address1}

            />
          </Paper>
          {/* <Paper className={classes.paper} elevation={0}>
            <TextField
            style={{width:'100%'}}
             type="file"
             onChange={(e)=>setmedia(e.target.files[0])}
            />
          
          </Paper> */}
          <Paper className={classes.paper} elevation={0}>
            <TextareaAutosize
              maxRows={3}
              aria-label="maximum height"
              variant='outlined'
              variant="outlined"
              label="Qo'shimcha ma'lumotlar..."
              onChange={(e) => setdesc(e.target.value)}
              value={desc1}
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
