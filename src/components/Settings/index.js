import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import BrandImg from "./assets/brand.jpg";
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../Config/config";
import jwt from "jwt-decode";
import Tooltip from '@mui/material/Tooltip';
import myimg from './assets/admin1.jpg'

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    margin: "20px auto",
  },
  media: {
    height: 240,
  },
  list: {
    listStyleType: "none",
    color: "#71c623",
  },
});


export default function MediaCard() {
  const [baZa, setbaZa] = useState([])
  const token = localStorage.getItem('token');

  useEffect(() => {

    axios.get(`http://localhost:8000/api/${jwt(token).role}/account/${jwt(token).id}`, {
      headers: {
        token: token,
      },
    }).then((res) => {
      setbaZa(res.data)
      // console.log("MyDAta", res.data);
    })

  }, [])

  const classes = useStyles();

  return (

    <Card className={classes.root}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15 }}>
        <h1 >{baZa.title ? 'My Profile' : 'Admin Panel '}</h1>
        <CardActions>
          <Tooltip title="Edit Profile" style={{ color: 'black' }} placement="left">
            <IconButton
              color="secondary"
              component={Link}
              style={{display:baZa.phone ? 'block' : 'none'}}
              to={{
                pathname: "/editpro",
                data: baZa,
              }}
              aria-label="edit profile"
              onClick={() => localStorage.setItem('MyProfile', JSON.stringify(baZa))}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </div>
      <CardActionArea
        component={Link}
        to={{
          pathname: "/displayimage",
          data: baZa,
        }}
        aria-label="edit profile"
        onClick={() => localStorage.setItem('myProfileImage', JSON.stringify(baZa))}
      >
        <CardMedia
        
          className={classes.media}
          // src={baZa.media}
          image={baZa.media ? baZa.media : myimg}
        />
      </CardActionArea>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          style={{display:baZa.title ? 'block' : 'none'}}
        >
          Brand Name: {baZa.title ? baZa.title : ''}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          component="li"
          className={classes.list}
        >
          Username: {baZa.username ? baZa.username : 'admin'}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          component="li"
          className={classes.list}
        >
          Password: {baZa.password ? baZa.password : 'admin'}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          style={{ fontFamily: "inherit", color: 'blue' }}
          component="li"
          className={classes.list}
        >
          Role: {baZa.role ? baZa.role : 'admin'}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          style={{ fontFamily: "monospace", color: 'gray',display:baZa.phone ? 'block' : 'none' }}
          component="li"
          className={classes.list}
        >
          Tel : {baZa.phone}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          component="li"
          style={{ fontFamily: '-moz-initial', color: 'gray' ,display:baZa.address ? 'block' : 'none'}}
          className={classes.list}
        >
          Manzil: {baZa.address}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          component="li"
          style={{ fontFamily: '-moz-initial', color: 'gray',display:baZa.desc ? 'block' : 'none' }}
          className={classes.list}
        >
          Description: {baZa.desc}
        </Typography>
      </CardContent>


    </Card>

  );
}
