import React, { useState } from "react";
import jwt from "jwt-decode";
import {
  Container,
  Paper,
  TextField,
  NativeSelect,
  Typography,
} from "@material-ui/core";
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
  const {type,disabled,placeholder,value,onChange,...rest} = props;
  return (
    <TextField
      color="primary"
      type={type}
      className={classes.inputs}
      disabled={disabled}
      placeholder={placeholder}
      fullWidth
      value={value}
      onChange={onChange}
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

const AddProductcomponent = () => {

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measure, setMeasure] = useState("kg");
  const [imgUrl, setImgUrl] = useState(undefined);
  const [desc, setDesc] = useState("");
  
  console.log("img url ", imgUrl);

  let history = useHistory();
  const token = localStorage.getItem("token");

  const handleClick = () => {
    history.push("/products");
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("agent", jwt(token).id);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("measure", measure);
    formData.append("media", imgUrl);
    formData.append("desc", desc);
    formData.append("active", true);

    try {
      await axios
        .post(`${apiUrl.url}/agent/products`, formData, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          if (res.status === 200) handleClick();
          console.log("Products Data: ", res.data);

        });
    } catch (error) {
      toast("Ma'lumotlar to'ldirishda xatolik", {
        className: "error",
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    }
  };

  return (
    <>
      <Container maxWidth="md" className={classes.wrapper}>
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
              Add product
            </Typography>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <InputComponent
              placeholder="Maxsulot nomi"
              type="text"
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <InputComponent
              placeholder="Narxi"
              name='price'
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <InputComponent
              placeholder="Xajmi"
              type="number"
              name='quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <NativeSelect
              onChange={(e) => {
                setMeasure(e.target.value);
              }}
              value={measure}
              name='measure'
              inputProps={{
                name: "measure",
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
          <TextField
            required
            style={{ margin: 10, width: '100%' }}
            variant="outlined"
            type="file"
            name="file"
            onChange={
             (e)=> setImgUrl((e.target.files[0])) //thiss is default
            }
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
              onClick={handleSubmit}
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
            >
              Confirm
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

export default AddProductcomponent;
