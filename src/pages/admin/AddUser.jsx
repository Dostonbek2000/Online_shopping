import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  NativeSelect,
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useStyles } from "./style";
import { Link, useHistory } from "react-router-dom";
import apiUrl from "../../Config/config";
import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";

// import { useSelector, useDispatch } from "react-redux";
// import jwt from "jwt-decode";

const AddUser = ({ infoToasty }) => {
  // const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [stir, setStir] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState(undefined);
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [role, setRole] = useState("agent");

  console.log("username",userName);
  console.log("title",title);
  console.log("phone",phone);
  console.log("stir",stir);
  console.log("password",password);
  console.log("imgurl",imgUrl);
  console.log("address",address);
  console.log("desc",desc);
  console.log("role",role);




  let history = useHistory();
  const handleClick = () => {
    history.push("./users");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("username", userName);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("title", title);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("media", imgUrl);
    formData.append("stir", stir);
    formData.append("desc", desc);
    // console.log("users Data add user component 68",formData);
    try {
      await axios
        .post(`${apiUrl.url}/admin/users`, formData, {
          headers: {
            token: token,
          },
        })
    } catch (error) {
      console.log(error);
    }

    handleClick();
  };
  return (
    <>
      <Container  maxWidth="md" className={classes.wrapper}>
        <form action="#" className={classes.root} autoComplete="on">
          <Paper elevation={0} className={classes.paper}>
            <Typography
              variant="h5"
              style={{
                textAlign: "center",
                fontFamily: '"Roboto" san-serif',
                color: "black",
              }}
            >
              Foydalanuvchi qo'shish
            </Typography>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <TextField
              color="primary"
              type="text"
              className={classes.inputs}
              fullWidth
              label="Brand nomi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
          <Paper elevation={0} className={classes.paper}>
            <TextField
              color="primary"
              type="text"
              className={classes.inputs}
              fullWidth
              value={userName}
              label="Ismi Familiyasi"
              onChange={(e) => setUserName(e.target.value)}
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

          <Paper elevation={0} className={classes.paper}>
            <TextField
              color="primary"
              type="text"
              className={classes.inputs}
              fullWidth
              label="Telefon raqami"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <Paper elevation={0} className={classes.paper}>
            <TextField
              color="primary"
              type="number"
              className={classes.inputs}
              fullWidth
              label="STIR raqmai"
              value={stir}
              onChange={(e) => setStir(e.target.value)}
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
          <Paper elevation={0} className={classes.paper}>
            <TextField
              color="primary"
              type="text"
              className={classes.inputs}
              fullWidth
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{
                style: {
                  fontFamily: "Roboto",
                  color: "black",
                  fontWeight: "800",
                  fontSize: "20px",
                },
              }}
            />
            <NativeSelect
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              inputProps={{
                name: "name",
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
              <option value="agent">Agent</option>
              <option value="customer">Customer</option>
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
             (e)=> setImgUrl(e.target.files[0]) //thiss is default
            }
          />
          </Paper>
          <Paper className={classes.paper} elevation={0}>
            <TextareaAutosize
              maxRows={3}
              aria-label="maximum height"
              variant="outlined"
              placeholder="Manzil ma'lumotlari..."
              onChange={(e) => setAddress(e.target.value)}
              value={address}
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
          <Paper className={classes.paper} elevation={0}>
            <TextareaAutosize
                maxRows={3}
              aria-label="maximum height"
              variant="outlined"
              placeholder="Qo'shimcha ma'lumotlar..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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
              Saqlash
            </Button>
            <Button
              component={Link}
              to={"/users"}
              variant="contained"
              fullWidth
              type="reset"
              // onChange={handleClick}
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

export default AddUser;
