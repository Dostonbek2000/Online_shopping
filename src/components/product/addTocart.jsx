import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
    "& .MuiBadge-root": {
      marginRight: theme.spacing(4),
    },
  },
  input: {
    maxWidth: theme.spacing(6),
  },
}));
  
const AddToCart = (product) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [itemCount, setItemCount] = React.useState(1);

  const AddProduct = () => {
    dispatch({ type: "ADD_PRODUCT", payload: { product, itemCount } });
  };

  return ( 
    <div className={classes.root}>
      <div>
        {/* <Badge color="secondary" badgeContent={itemCount}>
          <ShoppingCartIcon color="primary" />
        </Badge> */}
        <ButtonGroup>
          <Button
          
            aria-label="reduce"
            onClick={() => {
              setItemCount(Math.max(itemCount - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <TextField
            className={classes.input}
            id="outlined-size-small"
            variant="outlined"
            value={itemCount}
            size="small"
            onChange={(e) => setItemCount(e.target.value)}
            required
          />
          <Button
            aria-label="increase"
            onClick={() => {
              setItemCount(itemCount + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddShoppingCartIcon />}
        onClick={AddProduct}
        style={{backgroundColor:'blue'}}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default AddToCart;
