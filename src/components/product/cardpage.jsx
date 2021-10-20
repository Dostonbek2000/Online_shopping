import React from "react";
import jwt from "jwt-decode";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ButtonBase } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddToCart from "./addTocart";
import { Link } from "react-router-dom";
import img2 from './../../img/cubes.png';





const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%",
  },
  image: {
    width: 350,
    height: 250,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function ComplexGrid({
  handleActive,
  handleConfigure,
  handleDelete,
  handleShowModal,
  handleId,
  product,
  users,

}) {
  const token = localStorage.getItem("token");
  
  const { price, title, media, active, quantity, measure, desc } = product;
 
  console.log("media",media);

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper} style={{ marginTop: "20px", background: `url(${img2}) #F7F7F7` ,boxShadow:'0px 0px 5px gray'}}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase
                className={classes.image}
              
              >
                <img className={classes.img} style={{width:400,height:230}} alt="complex" src={media} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid
                item
                xs
                container
                direction="column"
                spacing={2}
                style={{ paddingLeft: "30px", paddingTop: "20px" }}
              >
                <Grid item >
                  <Typography gutterBottom variant="h5"  >
                    <span style={{ fontFamily: "-moz-initial", fontWeight: 'bold' }}>Name:</span> <span style={{ color: 'black' }}>{title}</span>
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    <span style={{ fontFamily: "-moz-initial", fontWeight: 'bold' }}>Price:</span> <span style={{ color: 'blue' }}>{price} {' so`m'}</span>
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    <span style={{ fontFamily: "-moz-initial", fontWeight: 'bold' }}>Measure:</span> <span style={{ color: 'green' }}>{quantity} {measure}</span>
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    <span style={{ fontFamily: "-moz-initial", fontWeight: 'bold' }}>Description:</span> <span style={{ color: 'gray' }}>{desc}</span>
                  </Typography>
                </Grid>
              </Grid>
              {jwt(token).role === "agent" ? (
                <Grid item style={{ paddingTop: "10px" }}>
                 <p style={{textAlign:'center',fontSize:16,fontFamily:'cursive',color:"red"}}> Delete</p>
                  <IconButton
                    aria-label="delete"
                    style={{ display: 'flex', marginLeft:20,marginTop:-10,marginBottom:10}}
                    onClick={() => {
                      handleShowModal();
                      handleId(product.id);
                    }}
                  >
                    <DeleteIcon style={{ color: "red", }} />
                  </IconButton>
                  <p style={{textAlign:'center',fontSize:16,fontFamily:'cursive',color:'green'}}> Edit</p>
                  <IconButton
                    style={{  float: 'center',marginLeft:20,marginTop:-10,paddingBottom:20 }}
                    aria-label="edit"
                    component={Link}
                    to={{ pathname: "/editproduct", product: product }}
                  >
                    <EditIcon style={{ color: "green" }} />
                  </IconButton>
                  <p style={{textAlign:'center',fontSize:16,fontFamily:'cursive',color:'blue'}}> Status</p>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="top"
                      control={
                        <Switch
                          checked={active}
                          onChange={handleActive}
                          name="isActive"
                          color="primary"
                          style={{fontFamily:'cursive'}}
                        />
                      }
                      style={{fontFamily:'cursive'}}
                      labelPlacement="top"
                    />
                  </FormGroup>
                </Grid>
              ) : (
                <AddToCart props={product} />
              )}
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}
