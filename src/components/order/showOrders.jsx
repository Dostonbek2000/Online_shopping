import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Icon from '@mui/icons-material/FormatListBulletedRounded'
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
const useStyles = makeStyles({
    table: {
        minWidth: 400,
    },
});

const arr = [];

function priceRow(qty, unit) {
    arr.push(qty * unit);
    return qty * unit;
}

function sum() {
    return arr.reduce((total, value) => {
        return total + value;
    });
}

export default function ShowOrder() {
    const classes = useStyles();
    const [items, setItems] = useState([JSON.parse(localStorage.getItem('myitems'))]);
    console.log('items', items[0]);
    return (
        <div>
            <h1 style={{textAlign:'center',padding:30,fontFamily:'cursive',fontWeight:'bold'}}>Ordered Products</h1>
            <TableContainer component={Paper} style={{width:'100%'}}>
                <Table className={classes.table}  style={{width:'100%'}}  aria-label="spanning table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'blue', color: 'white' }}>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }} align="left" colSpan={4}>
                                Korzinka Market
                            </TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }} align="right">Narxlar</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left'><Icon style={{ color: 'black' }} /></TableCell>
                            <TableCell align='center'>Maxsulot nomi</TableCell>
                            <TableCell align="center">Maxsulot soni</TableCell>
                            <TableCell align="center">Narxi</TableCell>
                            <TableCell align="right">Umumiy summa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items[0].map((row, index) => (
                            <TableRow key={index}>
                                <TableCell colSpan={1} >{index + 1}</TableCell>
                                <TableCell align='center'>{row.title}</TableCell>
                                <TableCell align="center">{row.quantity}{' '}{row.measure}</TableCell>
                                <TableCell align="center">{row.price}{' so`m'}</TableCell>
                                <TableCell align="right">
                                    {priceRow(row.price, row.quantity)} so'm
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow style={{ backgroundColor: 'orange', color: 'white' }}>
                            <TableCell colSpan={4} align="left">
                                Jami summa
                            </TableCell>
                            <TableCell align="right">{sum()} {' so`m'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
                <Button
                    color="secondary"
                    component={NavLink}
                    to={"/orders"}
                    style={{ textTransform: 'capitalize', backgroundColor: 'blue', color: 'white', paddingLeft: 10, paddingRight: 10, width: '20%' }}
                >
                    Back to Orders
                </Button>
            </div>
        </div>
    );
}
