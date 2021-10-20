import React, { useEffect } from "react";
import apiUrl from "../../Config/config";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    padding: "0px",
    margin:"0px"
  },
  
  showCordItem: {
    "@media (max-width: 1500px)": {
      maxWidth: "48%"
    },
    "@media (max-width:800px)": {
      maxWidth: "100%"
    },
    "@media ( max-width: 599px)": {
      maxWidth: "100%"
    },
    "@media ( max-width: 399px)": {
      maxWidth: "100%"
    }
  },
  media: {
    height: 240,
    
  },
});

const SHowAgentComponents = ({ users, /*handleProducts,*/ handleId }) => {
  const token = localStorage.getItem("token");
  const classes = useStyles();
  const dispatch = useDispatch();
  const AddProductAgent = (userId) => {
    dispatch({ type: "INIT", payload: { userId } });
  };

  return (
    <div className="Container">
      <Card
        style={{width: "100%", margin: "1%", float: "left" }}
        className={`${classes.root} ${classes.showCordItem}`}
      >
        <CardActionArea>
          <CardMedia className={classes.media} image={users.media} />
          <CardContent style={{position:'absolute',zIndex:99,marginTop:-110,backgroundColor:'#001D1E',width:'100%',opacity:0.7}}>
            <Typography style={{color:'white'}} gutterBottom variant="h5" component="h2">
              {users.title}
            </Typography>
            <Typography style={{color:'aqua',}} variant="body2" color="textSecondary" component="p">
              Adress: {users.address}
            </Typography>
            <Typography style={{color:'aqua'}} variant="body2" color="textSecondary" component="p">
              {users.desc}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{backgroundColor:'orange'}}>
          <Button
            size="small"
            color="primary"
            component={Link}
            style={{color:'white'}}
            to={{ pathname: "/products", user: users }}
            onClick={() => AddProductAgent(users.id)}
          >
            View products
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default SHowAgentComponents;
