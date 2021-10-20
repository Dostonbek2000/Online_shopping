import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  NativeSelect,
  Typography,
} from "@material-ui/core";
import jwt from "jwt-decode";

import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useStyles } from "./style";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../Config/config";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const InputComponent = (props) => {
  const classes = useStyles();

  return (
    <TextField
      color="primary"
      type={props.type}
      className={classes.inputs}
      disabled={props.disabled}
      placeholder={props.placeholder}
      fullWidth
      value={props.value}
      onChange={props.onChange}
      inputProps={{
        style: {
          fontFamily: "Roboto",
          color: "black",
          fontWeight: "800",
          fontSize: "20px",
          marginLeft: "10px",
        },
      }}
    />
  );
};

const EditProduct = (props) => {
  const token = localStorage.getItem("token");

  const product = props.location.product;
  const classes = useStyles();
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [measure, setMeasure] = useState(product.measure);
  const [imgUrl, setImgUrl] = useState(undefined);
  const [desc, setDesc] = useState(product.desc);
  const [active, setActive] = useState(product.active);

  let history = useHistory();
  const handleClick = () => {
    history.push("/products");
  };
  const handleSubmit = async (e) => {
    setActive(product.active);
    e.preventDefault();
    const product_Data = {
      price: price,
      quantity: quantity,
      measure: measure,
      imgUrl: imgUrl,
      desc: desc,
      title: title,
      active: active,
      agent: jwt(token).id,
    };
    try {
      const res = await axios.put(
        `${apiUrl.url}/agent/products/${product.id}`,
        product_Data,
        {
          headers: {
            token: token,
          },
        }
      );
      handleClick();
    } catch (error) {
      console.log(error);
      toast("Ma'lumotlar to'ldirishda xatolik", {
        className: "error",
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <>
      <Container fluid='true' maxWidth="md" className={classes.wrapper}>
        <form
          className={classes.root}
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <Paper elevation={0} className={classes.paper}>
            <Typography
              variant="h2"
              style={{
                textAlign: "center",
                fontFamiliy: '"Roboto" san-serif',
                color: "black",
              }}
            >
              Edit product
            </Typography>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <InputComponent
              placeholder="Maxsulot nomi"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <InputComponent
              placeholder="Narxi"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <InputComponent
              placeholder="Xajmi"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <NativeSelect
              value={measure}
              onChange={(e) => {
                setMeasure(e.target.value);
              }}
              inputProps={{
                name: "name",
                defaultChecked: " ",
                id: "uncontrolled-native",
                style: {
                  fontFamily: "Roboto",
                  color: "black",
                  fontWeight: "800",
                  margin: "0px 10px",
                  padding: "0px 10px",
                  width: "70px",
                },
              }}
            >

              <option value="kg">Kg</option>
              <option value="dona">Dona</option>
              <option value="litr">Litr</option>
            </NativeSelect>
          </Paper>

          <Paper className={classes.paper} elevation={0}>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-photo"
              onChange={(e) => {
                setImgUrl(URL.createObjectURL(e.target.files[0]));
              }}
              type="file"
            />
            <label htmlFor="icon-button-photo">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>

            <TextField
              color="primary"
              type="text"
              className={classes.inputs}
              fullWidth
              id="browseImage"
              disabled={true}
              placeholder="rasm yuklash"
              value={imgUrl}
              inputProps={{
                style: {
                  fontFamily: "Roboto",
                  color: "black",
                  fontWeight: "800",
                  fontSize: "20px",
                },
              }}
            />
          </Paper>
          <Paper className={classes.paper} elevation={0}>
            <TextareaAutosize
              maxRows={3}
              aria-label="maximum height"
              variant="outlined"
              placeholder="Qo'shimcha ma'lumotlar..."
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
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
              variant="contained"
              fullWidth
              type="submit"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
            >
              Saqlash
            </Button>
            <Button
              component={Link}
              to={"/"}
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
        <ToastContainer
          draggable={false}
          autoClose={2000}
          transition={Bounce}
        />
      </Container>
    </>
  );
};

export default EditProduct;
