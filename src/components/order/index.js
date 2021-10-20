import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import apiUrl from "../../Config/config";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  orderCordItem: {
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
    height: 230,
  },
});

const Orders = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");

  const foo = useSelector((state) => {
    return state.auth.role;
  });

  const [role] = useState(foo);
  const [order, setOrder] = useState([]);
  const [refresh, setrefresh] = useState(false)
  const [nextBASE, setnextBASE] = useState([])
  console.log("order ", order);

  const [pathUrl] = useState(
    role === "agent" ? "/agent/orders" : "/customer/orders"
  );

  useEffect(() => {
    async function myFunc3() {
      try {
        const result = await axios.get(apiUrl.url + pathUrl, {
          headers: {
            token: token,
          },
        });
        if (result.status == 200) {
          setOrder(result.data);
          setrefresh(!refresh)
        }
      } catch (error) {
        console.log(error);
      }
    }
    myFunc3();
  }, []);

  return (
    <div style={{ color: '#1a9900' }}>
      <h1 style={{ textAlign: 'center', padding: 30, fontFamily: '-moz-initial', fontWeight: 'bold', color: '#380100', fontSize: 35 }}>Siz uchun Kelgan Orderlar</h1>
      <div className="Container">
        {order.length !== 0 ? order.map((data, index) => (
          <Card
            className={`${classes.root} ${classes.orderCordItem}`}
            style={{ width: "100%", margin: "1%", float: "left" }}
            key={index}
          >
            <CardActionArea>
              <CardMedia className={classes.media} image={data.customer.media ? data.customer.media : data.agent.media} onClick={() => setnextBASE(data.agent)} />
              <CardContent style={{width:'100%',}}>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.customer.title ? data.customer.title : data.agent.title}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="h3">
                  Adress:  {data.customer.address ? data.customer.address : data.agent.address}

                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Telephone:  {data.customer.phone ? data.customer.phone : data.agent.phone}

                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                style={{   textShadow: '0px 0px 0px black' }}
                component={Link}
                to={"/showorder"}
                onClick={() => window.localStorage.setItem('myitems', JSON.stringify(data.items))}
              >
                View Orders
              </Button>
            </CardActions>
          </Card>
        )) : <p style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Sizga order yoq</p>}
      </div>
    </div>
  );
};

export default Orders;
