import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { Link, NavLink } from "react-router-dom";
import Cardpage from "./cardpage";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import spinner from './1.gif'
import apiUrl from "../../Config/config";
import ComfirmComponent from "./confirm";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconBack from '@mui/icons-material/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Redirect } from "react-router-dom";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid blue',
    boxShadow: 24,
    p: 4,
    borderRadius: 5
};

const useStyles = makeStyles({
    root: {
        maxWidth: "100%",
        padding: "0px",
        margin: "0px"
    },
    productItem: {
        "@media (max-width:800px)": {
            maxWidth: "100%"
        },
        "@media ( max-width: 599px)": {
            maxWidth: "90%"
        },
        "@media ( max-width: 399px)": {
            maxWidth: "90%"
        }
    },
    media: {
        height: 140,
    },
});

function ProductPage(props) {
    const {location,...rest} = props;
    const classes = useStyles();
    const token = localStorage.getItem("token");

    const [cardItems, setCardItems] = useState([]);
    const [role] = useState(jwt(token).role);
    const [status, setStatus] = useState(false);
    const [show, setShow] = useState(false);
    const [productId, setProductId] = useState(0);
    const [setUserId] = useState(role === "agent" ? jwt(token).id : null);
    const [direction, setDirection] = useState(false)
    var [activeStatus, setActiveStatus] = useState(0);

    const [pathUrl] = useState(
        role === "agent"
            ? "/agent/products/" + jwt(token).id
            : "/customer/products/" + location.user.id
    );
    useEffect(() => {
        async function myFunc() {
            try {
                const result = await axios.get(apiUrl.url + pathUrl, {
                    headers: {
                        token: token,
                    },
                });
                setCardItems(result.data.reverse());
                console.log("resssssss", result.data);
                if (result.status === 200 && activeStatus === 0) {
                    toast("Products is uploaded successfully", {
                        className: "custom-toast",
                        draggable: true,
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setActiveStatus(0)
                }
            } catch (error) {
                toast("Error at Uploading Products", {
                    className: "error",
                    draggable: true,
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }
        myFunc();
    }, [status]);


    const handleShowModal = () => {
        setShow(true);
    };


    const handleConfigure = (e) => {
        if (e) {
            handleDelete(productId);
        }
    };


    const handleDelete = async (id) => {
        try {
            await axios
                .delete(`${apiUrl.url}/agent/products/${id}`, {
                    headers: {
                        token: token,
                        id: jwt(token).id,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        toast("O'chirish yakunlandi", {
                            className: "deleted-info",
                            draggable: true,
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                });
        } catch (error) {
            console.log(error);
        }
        setStatus(!status);
    };


    const handleActive = async (product) => {
        setActiveStatus(1)
        const product_Status = { ...product, active: !product.active };
        try {
            const res = await axios.put(
                `${apiUrl.url}/agent/products/${product.id}`,
                product_Status,
                {
                    headers: {
                        token: token,
                    },
                }
            );
            if (res.status === 200) {
                toast("Product's status was changed", {
                    className: "custom-toast",
                    draggable: true,
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            console.log(error);
            toast("Error  occured", {
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
        role === "agent" ? setProductId(id) : setUserId(id);
    };


    const dispatch = useDispatch();
    let history = useHistory();
    const AgentCheck = useSelector((state) => state.cart.agent);
    const ItemsCheck = useSelector((state) => state.cart.items);


    const AddProductAgent = (userId) => {
        if (AgentCheck !== null) {
            handleOpen()
            // window.alert('siz maxsulotlari junatmadingiz !')
        } else {
            dispatch({ type: "INIT", payload: { userId } });
        }
    };

    const handleCart = () => {
        history.push("./cart");
        handleClose()
    };

    const Doit = () => {
        if (ItemsCheck.length === 0) {
            history.push('/users')
            // return ( <Redirect to={"/users"} /> )
        } else {
            setOpen(true)
        }
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose1 = () => setOpen(false);


    return (
        <>
            <div>

                <Modal
                    open={open}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography style={{ textAlign: 'center', marginLeft: -30, fontWeight: 'bold' }} id="modal-modal-title" variant="h6" component="h2">
                            Eslatma !
                        </Typography>
                        <Typography style={{ marginLeft: 17, marginTop: 8 }} id="modal-modal-description" >
                            Siz Maxsus Marketdan maxsulot zakaz qildingiz . Boshqa maxsulot zakaz qilish uchun avval orderni tasdiqlang !
                        </Typography>
                        <div style={{ paddingTop: 20, paddingLeft: 10, display: 'flex', justifyContent: 'space-around' }}>

                            <Button variant='outlined' style={{ color: 'red' }} onClick={handleClose1}>cancel</Button>
                            <Button
                                variant='outlined'
                                onClick={handleCart}
                                component={Link}
                                to={{ pathname: "/cart" }}
                            >
                                Tasdiqlash
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
            <div
                style={{ width: "100%", margin: "0px 0px 0px 2%", float: "right" }}
                className={`${classes.root} ${classes.productItem}`}>
                {role === "agent" ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 style={{ textAlign: 'center', padding: 30, fontFamily: '-moz-initial', fontWeight: 'bold', color: 'black', fontSize: 39 }}>Selling Products </h1>
                        <Button
                            variant="contained"
                            component={NavLink}
                            to={"/addproduct"}
                            color='primary'
                            disableelevation='true'
                            style={{ display: cardItems.length !== 0 ? 'inline-block' : "none", backgroundColor: '#0014eb', color: 'white' }}
                        >
                            ADD your Product
                        </Button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            // component={NavLink}
                            onClick={Doit}
                            // to={direction ? { pathname: "/users" } : { pathname: "/users" }}
                            color='primary'
                            disableelevation='true'
                            style={{ display: cardItems.length !== 0 ? 'flex' : "none", backgroundColor: '#0014eb', color: 'white', justifyContent: 'space-around', alignItems: 'center', width: 150, height: 40 }}
                        >

                            <IconBack /> Back
                        </Button>
                        <h1 style={{ display: cardItems.length !== 0 ? 'inline-block' : "none", textAlign: 'center', padding: 30, fontFamily: 'cursive', fontWeight: 'bold', width: '100%' }}>You can Buy How much you want here</h1>
                    </div>
                )}
                <ComfirmComponent
                    show={show}
                    text={"O'chirishni tasdiqlaysizmi ?"}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    handleConfigure={handleConfigure}
                />
                <ToastContainer draggable={false} autoClose={2000} transition={Bounce} />
                {cardItems.length !== 0 ? (
                    cardItems.map((product, index) => {
                        return (
                            <Cardpage
                                handleDelete={() => handleDelete(product)}
                                handleActive={() => handleActive(product)}
                                handleShowModal={handleShowModal}
                                key={index}
                                product={product}
                                handleId={handleId}
                            />
                        );
                    })
                ) : (
                    <div style={{ width: '800px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <img style={{ width: '400px' }} src={spinner} alt="" />
                    </div>

                )}
            </div>
        </>
    );
}

export default ProductPage;
