import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import axios from "axios";
import apiUrl from "../Config/config";
import { useDispatch, useSelector, useStore } from "react-redux";
import jwt from "jwt-decode";
import "./login.css";
import LoginPicture1 from './1.jpg'


function Login() {
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) {
      const jwtData = jwt(token);
      dispatch({ type: "LOGIN_SUCCESS", payload: { ...jwtData, token } });
      history.push("/home");
    }
  }, [dispatch, history]);


  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("agent");

  const handleRadioChange = (event) => {
    setRole(event.target.value);
  };
  const handleSubmit = async (e) => {
    console.log("login =", login);
    console.log("password =", password);
    e.preventDefault();
    const Auth_Data = {
      username: login,
      password: password,
    };

    try {
      if (role === "agent") {
        const httpResponse = await axios.post(
          apiUrl.url + "/agent/auth",
          Auth_Data
        );
        if (httpResponse.status === 200) {
          const token = httpResponse.data.token;
          localStorage.setItem("token", token);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { ...jwt(token), token },
          });
          history.push("/home");
        }
      } else if (role === "customer") {
        const httpResponse = await axios.post(
          apiUrl.url + "/customer/auth",
          Auth_Data
        );
        if (httpResponse.status === 200) {
          const token = httpResponse.data.token;
          localStorage.setItem("token", token);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { ...jwt(token), token },
          });
          history.push("/home");
        }
      }
    } catch (error) {
      dispatch({ type: "LOGOUT_SUCCESS" });
      localStorage.removeItem("token");
    }
  };

  return (
    <div className="center">
      <div className='Wrapper'>
        <div>
          <img style={{borderRadius:30}} src={LoginPicture1} alt="" />
        </div>
      <div className="login">
        <form action="#" autoComplete="on">
          <h3 className='signinh3'>Welcome to Delivery</h3>
          <RadioGroup
            row
            aria-label="quiz"
            name="quiz"
            value={role}
            onChange={handleRadioChange}
            style={{display:'flex',justifyContent:'space-around',paddingBottom:20,fontFamily:'cursive'}}
          >
            <FormControlLabel
              value="agent"
              control={<Radio />}
              label="Seller"
              style={{color:'blue',fontFamily:'cursive'}}
            />
            <FormControlLabel
              value="customer"
              control={<Radio />}
              label="Customer"
              style={{color:'blue',fontFamily:'cursive'}}

            />
          </RadioGroup>
          <TextField
            className="input"
            id="input-with-icon-textfield"
            placeholder="Login"
            variant='outlined'
            style={{backgroundColor:'none',borderColor:'black',fontFamily:'cursive',height:50}}
            onChange={(e) => setLogin(e.target.value)}
            InputLabelProps={{
              style: { color: "#fff", fontSize: "18px", display: "inline",borderColor:'black',height:50 },
            }}
            InputProps={{
              style: { fontSize: "20px", color: "blue", width: "350px" ,borderColor:'black',fontFamily:'cursive',height:50,borderColor:'blue',height:50},
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle style={{ color: "blue", fontSize: "30px" }} />
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <br />
          <TextField
            className="input"
            id="input-with-icon-textfield"
            placeholder="Password"
            style={{borderColor:'black',fontFamily:'cursive',height:50}}
            variant='outlined'
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#fff", fontSize: "18px", display: "inline" ,paddingLeft:10,height:50,backgroundColor:'red'},
            }}
            InputProps={{
              style: { fontSize: "20px", color: "blue", width: "350px" ,borderColor:'black',fontFamily:'cursive',height:50,},
              startAdornment: (
                
                <InputAdornment position="start" >
                  <LockIcon style={{ color: "blue", fontSize: "30px" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            style={{ width: "300px",height:40,fontWeight:'bold',borderRadius:20 ,marginTop:50,fontFamily:'cursive'}}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
