import React from 'react'
import home from './../../img/hom.png';
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './home.css'
const Home = () => {
  const userRole = useSelector((state) => state.auth.role);

    return (
        <div>
            <div className='disflex' style={{height:'85vh'}}>
                <div className='onlinediv' style={{ width: '49%' }} >
                    <h1 className='h1h1' style={{ fontSize: 70, fontFamily: "inherit", color: 'orange'}}>Online</h1>
                    <h2 className='h2h2' style={{ fontSize: 45, fontFamily: "inherit", marginLeft: 5, marginTop: -29, }}>Shopping</h2>
                    <p className='ppp' style={{fontSize:16,color:'gray',padding:10}}>
                        
                        Welcome to our simple App ,
                        This helps  you to sell and buy products ,
                        We hope You like it .
                    </p>
                    <Button
                    component={NavLink}
                    to={userRole==='admin' ? '/users' : userRole==='agent' ? "/products" : "/users"}
                        style={{
                            marginTop:10,
                            width: '100%',
                            backgroundColor: 'orange',
                            borderRadius: 60,
                            height: 50,
                            fontSize: 19,
                            color: 'white'
                        }}
                    >
                        Get Started
                    </Button>
                </div>
                <div className='imagediv'>
                    <img style={{ width: 650 }} src={home} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home
