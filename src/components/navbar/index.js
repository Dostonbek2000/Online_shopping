import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
// import jwt from "jwt-decode";
import img2 from '../../img/cubes.png'
const drawerWidth = 240;
import jwt from "jwt-decode";


const menuItems = [
  {
    menuicon: <HomeIcon />,
    menuTitle: "Product",
    pageUrl: "/products",
    roles: ["agent"],
  },
  {
    menuicon: <PeopleIcon />,
    menuTitle: "Users",
    pageUrl: "/users",
    roles: ["admin", "customer"],
  },
  {
    menuicon: <ViewModuleIcon />,
    menuTitle: "Orders",
    pageUrl: "/orders",
    roles: ["agent", "customer"],
  },
  {
    menuicon: <SettingsIcon />,
    menuTitle: "Setting",
    pageUrl: "/setting",
    roles: ["agent", "customer", "admin"],
  },
  {
    menuicon: <ExitToAppIcon />,
    menuTitle: "Exit",
    pageUrl: "/",
    roles: ["agent", "customer", "admin"],
  },
 
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: '#1a9900'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(30) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const userRole = useSelector((state) => state.auth.role);
  const countItemStore = useSelector((state) => state.cart.items);

  const [countItemsStore, setCountItemsStore] = useState(
    useSelector((state) => state.cart.items)
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    setCountItemsStore(countItemStore.length);
  }, [countItemStore]);

  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const [open, setOpen] = useState(false);

  const onHandleSignOut = () => {
    dispatch({ type: "LOGOUT_SUCCESS" });
    localStorage.removeItem("token");
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuClick = (pageUrl) => {
    // console.log(pageUrl);
    // history.push(pageUrl);
    // setAnchorEl(null);
  };

  const handleCart = () => {
    history.push("./cart");
  };

  return (
    <div style={{ backgroundColor: '#2bff00' }} >
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: '#0014eb' }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon style={{color:'white'}}/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Product Delivery
          </Typography>
          {userRole === "customer" ? (
            <Badge badgeContent={countItemsStore} color="secondary">
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={handleCart}
              >
                Purchase
              </Button>
            </Badge>
          ) : (
            <span> </span>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div style={{ backgroundColor: '#F7F7F7' }} className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List style={{ backgroundColor: 'aqua', background: `url(${img2}) #F7F7F7`, height: '100%' }}>
          <h1 style={{ textAlign: "center", textTransform: 'capitalize' }}>{userRole}</h1>
          {menuItems
            .filter((menuItem) => {
              return menuItem.roles.indexOf(userRole) > -1;
            })
            .map((menuItem, index) => {
              const { menuicon, menuTitle, pageUrl } = menuItem;
              return (
                <ListItemText key={index}>
                  <Button
                    component={Link}
                    to={pageUrl}
                    style={{ marginLeft: "10px", textTransform: 'capitalize', fontWeight: 'bold' }}
                    onClick={() => {
                      menuTitle === "Exit"
                        ? onHandleSignOut()
                        : menuClick(pageUrl);
                      setOpen(false);
                    }}
                  >
                    {menuicon}
                    <ListItemText style={{ marginLeft: "15px", fontFamily: 'cursive' }}>
                      {menuTitle.toLowerCase()}
                    </ListItemText>
                  </Button>
                </ListItemText>
              );
            })}
        </List>
      </Drawer>
    </div>
  );
}


