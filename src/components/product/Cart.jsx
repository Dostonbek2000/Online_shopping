import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Input } from "@material-ui/core";
import shop from './../../img/shop.gif'
import axios from "axios";
import apiUrl from "../../Config/config";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();
  const cartList = useSelector((state) => {
    return state.cart;
  });
  const customerId = useSelector((state) => {
    return state.auth.id;
  });
  useEffect(() => {
    setCart(cartList.items);
  }, [cart, cartList.items]);

  const classes = useStyles();
  const token = localStorage.getItem("token");
  const deleteItem = (index) => {
    const foo = cart.splice(index, 1);
    return setCart(foo);
  };

  const SubmitCart = async () => {
    const order = {
      agent: cartList.agent,
      customer: customerId,
      customerComment: comment,
      time: Date.now().toString(),
      items: cart,
    };
    try {
      const httpResponse = await axios.post(
        apiUrl.url + "/customer/orders",
        order,
        {
          headers: {
            token: token,
          },
        }
      );
      if (httpResponse.status === 200) {
        dispatch({
          type: "RESET",
        });
        setCart([]);
        history.push("/home");
      }
    } catch (error) {
      console.log("Error at Cart.jsx in a row 84");
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' ,flexWrap:'wrap'}}>
        {cart.map((item, index) => {
          return (
            <Card style={{width:320,backgroundColor:'#00eb1b',margin:20}} variant="outlined" key={index} >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {index+1}{'. '}{item.title}
                </Typography>

                <Typography variant="body2" component="p">
                  {item.quantity} {item.measure}
                </Typography>
                <Typography variant="body3" component="p">
                  narxi: {item.quantity * item.price} so'm
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    deleteItem(index);
                  }}
                >
                  Delete
                </Button>
                <Button size="small">
                  Save
                </Button>
              </CardActions>
            </Card>

          );
        })}
      </div>
      {cart.length !== 0 ? (
        <div>
          <Card style={{ display: 'inline-block', width: '100%',height:60,marginTop:30 }}>
            <Typography variant="h5" component="h2" style={{ width: '100%', }}>
              <Input style={{ paddingLeft: "15px", width: '100%' }}
                placeholder="Izoh qoldirish!"
                onChange={(e) => {
                  setComment(e.target.value || "");
                }}
              />
            </Typography>
          </Card>
            <div style={{display:'flex',justifyContent:'center'}}>
            <Button variant="contained" color="primary" onClick={SubmitCart} style={{ width: '30%', margin: 30 }}>
              Tasdiqlash
            </Button>
            </div>
        </div>
      ) : (
        <div>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>
             <img style={{width:200}} src={shop} alt="" />
          </div>
          <h1 style={{display:'flex',height:'100px',justifyContent:'center',alignItems:'center'}}> You didn't buy anything , Please buy and click again </h1>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:10}}>
             <Button
             component={NavLink}
             to={{ pathname: "/users",}}
             style={{backgroundColor:'orange',borderRadius:19,width:'24%',height:40,color:'white'}}
             >
               Go to Products
             </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
