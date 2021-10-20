import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Grid } from "@material-ui/core";
import GlobalLogin from './login/Login';
import AdminLogin from './login/AdminLogin';
import Home from "./pages/home/Home";
import Navbar from './components/navbar/index'
import ProductPage from './components/product/index'
import Orders from './components/order/index';
import AddProduct from './components/product/addproduct';
import ShowOrder from "./components/order/showOrders";
import EditProduct from './components/product/editProduct';
import UserList from "./pages/customer/UserList";
import Cart from "./components/product/Cart";
import AddUser from "./pages/admin/AddUser";
import EditUser from './pages/admin/EditUser'
import Settings from './components/Settings/index';
import EditProfile from './components/Settings/EditProfile'

function App() {
  const loggedIn = useSelector((state) => !!state.auth.token);
  
  return (
    <div style={{backgroundColor:'#1a9900',background:`#F7F7F7`,}}>
      <Switch>
        <Router>
         
          <Route path="/login" exact render={() => <GlobalLogin />} />
          <Route path="/adminlogin" render={() => <AdminLogin />} />
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item>{loggedIn ? <Navbar /> : ""}</Grid>
            <Grid item sm={9} style={{ marginTop: "80px", textAlign: "start" }}>
              <Route path="/" exact render={() => <Redirect to="/home" />} />
              <ProtectedRoute
                path="/home"
                exact
                component={Home}
                auth={loggedIn}
              />
              <ProtectedRoute
                path="/users"
                exact
                component={UserList}
                auth={loggedIn}
              />
           <ProtectedRoute
              path="/addproduct"
              exact
              component={AddProduct}
              auth={loggedIn}
            />
            <ProtectedRoute
              path="/orders"
              exact
              component={Orders}
              auth={loggedIn}
            />
            <ProtectedRoute
              path="/products"
              exact
              component={ProductPage}
              auth={loggedIn}
            />
            <ProtectedRoute
              path="/showorder"
              exact
              component={ShowOrder}
              auth={loggedIn}
            />
            <ProtectedRoute
              path="/setting"
              exact
              component={Settings}
              auth={loggedIn}
            />
            <ProtectedRoute
              path="/editproduct"
              exact
              component={EditProduct}
              auth={loggedIn}
            />
            <ProtectedRoute
              path="/adduser"
              exact
              component={AddUser}
              auth={loggedIn}
            />
            <ProtectedRoute
              path="/edituser"
              exact
              component={EditUser}
              auth={loggedIn}
            />
            <ProtectedRoute
              path="/editpro"
              exact
              component={EditProfile}
              auth={loggedIn}
            />
            <ProtectedRoute
              path="/cart"
              exact
              component={Cart}
              auth={loggedIn}
            /> 
            </Grid>
          </Grid>
        </Router>
      </Switch>
    </div>
  )
}

export default App;
