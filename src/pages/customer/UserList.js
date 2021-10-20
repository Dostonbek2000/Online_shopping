import { React, useState, useEffect } from "react";
import apiUrl from "../../Config/config";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import UserItem from "./UserItem";
import ComfirmComponent from "./confirm";
import "./User.css";
// import { useSelector, useDispatch } from "react-redux";
import jwt from "jwt-decode";
import SHowAgentComponents from "../agent/showAgent";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 140,
  },
  alert: {
    width: "100%",
    fontSize: "40px",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const UserList = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");

  const [categoryList, setCategoryList] = useState([]);
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0);
  const [pathUrl] = useState(
    jwt(token).role === "admin" ? "/admin/users" : "/customer/agents"
  );

  const handleShowModal = () => {
    setShow(true);
  };
  const handleConfigure = (e) => {
    if (e) {
      handleDelete(userId);
    }
  };
  useEffect(() => {
    async function myFunc1() {
      try {
        const result = await axios.get(apiUrl.url + pathUrl, {
          headers: {
            token: token,
          },
        });
        setCategoryList(result.data);
        if (result.status === 200) {
          toast("Products Successfully Uploaded", {
            className: "custom-toast",
            draggable: true,
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.log(error);
        toast("Error during Uploading Data of the Products", {
          className: "error",
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    myFunc1();
  }, [pathUrl, status, token]);
  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`${apiUrl.url}/admin/users/${id}`, {
          headers: {
            token: token,
          },
        })
    } catch (error) {
      console.log(error);
    }
    setStatus(!status);
    toast("Successfully deleted", {
      className: "deleted-info",
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleSubmit = async (user) => {
    const user_Status = { ...user, active: !user.active };
    try {
      const res = await axios.put(
        `${apiUrl.url}/admin/users/${user.id}`,
        user_Status,
        {
          headers: {
            token: token,
          },
        }
      );
      if (res.status === 200) {
        toast("User Status is Changed", {
          className: "custom-toast",
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
      toast("Error is occured", {
        className: "error",
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setStatus(!status);
  };

  const handleClickOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleId = (id) => {
    setUserId(id);
  };

  return (
    <div>
      {jwt(token).role === "admin" ? (
        <Button
          variant="contained"
          component={Link}
          to={"/adduser"}
          color="primary"
          disableelevation='true'
        >
          ADD
        </Button>
      ) : (
        <h1 style={{textAlign:"center"}}>Dillerlar ro'yhati</h1>
      )}

      <ComfirmComponent
        show={show}
        text={"Are you sure you delete this ?"}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleConfigure={handleConfigure}
      />
      <ToastContainer draggable={false} autoClose={2000} transition={Bounce} />

      {categoryList.length !== 0 ? (
        jwt(token).role === "admin" ? (
          categoryList.map((user, index) => {
            return (
              <UserItem
                handleDelete={() => handleDelete(user)}
                handleSubmit={() => handleSubmit(user)}
                handleShowModal={handleShowModal}
                key={index}
                users={user}
                handleId={handleId}
              />
            );
          })
        ) : (
          categoryList.map((user, index) => {
            return (
              <SHowAgentComponents
                // onClick={() => handleId(id)}
                handleShowModal={handleShowModal}
                key={index}
                users={user}
                handleId={handleId}
              />
            );
          }) 
        )
      ) : (
        <div>
          <div className={classes.alert}>
            <Alert severity="info">
              <AlertTitle>InfoAlert</AlertTitle>
              There is no any User
              <strong>Please enter users first!</strong>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
