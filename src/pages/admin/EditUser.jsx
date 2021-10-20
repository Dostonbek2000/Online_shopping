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
import axios from "axios";
import apiUrl from "../../Config/config";
import { useStyles } from "./style";
import { Link, useHistory } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export const EditUser = (props) => {
  const classes = useStyles();
  const user = props.location.user;
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState(user.username);
  const [title, setTitle] = useState(user.title);
  const [phone, setPhone] = useState(user.phone);
  const [stir, setStir] = useState(user.inn);
  const [password, setPassword] = useState(user.password);
  const [imgUrl, setImgUrl] = useState(user.imgUrl);
  const [address, setAddress] = useState(user.address);
  const [desc, setDesc] = useState(user.desc);
  const [role, setRole] = useState(user.role);
  const [loading, setLoading] = React.useState(false);

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
  let history = useHistory();
  const handleClick = () => {
    history.push("./users");
  };
  const handleSelectImageUrl = (e) => {
    console.log("image url", e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_Data = {
      username: userName,
      title: title,
      phone: phone,
      stir: stir,
      password: password,
      imgUrl: imgUrl,
      address: address,
      desc: desc,
      role: role,
    };
    try {
      const res = await axios.put(
        `${apiUrl.url}/admin/users/${user.id}`,
        user_Data,
        {
          headers: {
            token: token,
          },
        }
      );
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
    handleClick();
  };

  return (
    <>
      {loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="primary" thickness="6" />
        </Backdrop>
      ) : (
        <Container fluid='true' maxWidth="md" className={classes.wrapper}>
          <form action="#" className={classes.root} autoComplete="on">
            <Paper elevation={0} className={classes.paper}>
              <Typography
                variant="h5"
                style={{
                  textAlign: "center",
                  fontFamiliy: '"Roboto" san-serif',
                  color: "black",
                }}
              >
                Foydalanuvchi ma'lumotlarini o'zgartirish
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
              <IconButton
                onClick={handleSelectImageUrl}
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <UploadButtons />
              </IconButton>
              <TextField
                color="primary"
                type="text"
                className={classes.inputs}
                fullWidth
                id="browseImage"
                disabled="true"
                placeholder="rasm yuklash"
                value={imgUrl}
                onChange={(e) => {
                  setImgUrl(URL.createObjectURL(e.target.files[0]));
                }}
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
                rowsMax={3}
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
                rowsMax={3}
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
                Save
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
      )}
    </>
  );
};

export default EditUser