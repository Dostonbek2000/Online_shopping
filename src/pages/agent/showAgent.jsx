import React, { useEffect, useState } from "react";
import apiUrl from "../../Config/config";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid blue',
  boxShadow: 24,
  p: 4,
  borderRadius: 5
};


import './CardContent.css'
const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    padding: "0px",
    margin: "0px"
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
  let history = useHistory();
  const AgentCheck = useSelector((state) => state.cart.agent);
  const ItemsCheck = useSelector((state) => state.cart.items);

  console.log("agent", AgentCheck);
  console.log("items", ItemsCheck.length);


  const AddProductAgent = (userId) => {
    if (AgentCheck !== null ) {
      handleOpen()
      // window.alert('siz maxsulotlari junatmadingiz !')
    } else {
      dispatch({ type: "INIT", payload: { userId} });
    }
  };

  const handleCart = () => {
    history.push("./cart");
    handleClose()
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="Container">
      <div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography style={{ textAlign: 'center', marginLeft: -30, fontWeight: 'bold' }} id="modal-modal-title" variant="h6" component="h2">
              Eslatma !
            </Typography>
            <Typography style={{ marginLeft: 17, marginTop: 8 }} id="modal-modal-description" >
              Siz Maxsus Marketdan maxsulot zakaz qildingiz . Boshqa maxsulot zakaz qilish uchun avval orderni tasdiqlang !
            </Typography>
            <div style={{ paddingTop: 20, paddingLeft: 10, display: 'flex', justifyContent: 'space-around' }}>

              <Button variant='outlined' style={{ color: 'red' }} onClick={handleClose}>cancel</Button>
              <Button
                variant='outlined'
                onClick={handleCart}
                component={Link}
                to={{ pathname: "/cart" }}
              >
                Tasdiqlash
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <Card
        style={{ width: "100%", margin: "1%", float: "left" }}
        className={`${classes.root} ${classes.showCordItem}`}
      >
        <CardActionArea>
          <CardMedia className={classes.media} image={users.media} />
          <CardContent className='CardContent' >
            <Typography style={{ color: 'white' }} gutterBottom variant="h5" component="h2">
              {users.title}
            </Typography>
            <Typography style={{ color: 'aqua', }} variant="body2" color="textSecondary" component="p">
              Adress: {users.address}
            </Typography>
            <Typography style={{ color: 'aqua' }} variant="body2" color="textSecondary" component="p">
              {users.desc}
            </Typography>
          </CardContent>
          <CardContent style={{ height: 10, marginBottom: 17, padding: 10 }} >
            <Typography style={{ fontFamily: "sans-serif", color: 'rgb(44,44,44)' }} gutterBottom variant="h5" component="h2">
              {users.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions >
          <Button
            size="small"
            color="primary"
            component={Link}

            to={ItemsCheck.length === 0 ? { pathname: "/products", user: users } : { pathname: "/users" }}
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
