import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import BrandImg from "./assets/brand.jpg";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../Config/config";
import jwt from "jwt-decode";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
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

      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={baZa.media}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
          >
            {baZa.title}
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            component="li"
            className={classes.list}
          >
            Username: {baZa.username}
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            component="li"
            className={classes.list}
          >
            Password: {baZa.password}
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            component="li"
            className={classes.list}
          >
            Role: {baZa.role}
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            component="li"
            className={classes.list}
          >
            Tel : {baZa.phone}
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            component="li"
            className={classes.list}
          >
            Manzil: {baZa.address}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          color="secondary"
          component={Link}
          to={{
            pathname: "/editpro",
            data: baZa,
          }} 
          aria-label="edit profile"
          onClick={()=>localStorage.setItem('MyProfile',JSON.stringify(baZa))}
        >
          <EditIcon style={{marginRight:10}}/> { ' '} Edit My profile
        </IconButton>
      </CardActions>

    </Card>

  );
}
