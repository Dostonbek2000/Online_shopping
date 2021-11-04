import React from 'react'
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import Exit from "@material-ui/icons/ExitToAppOutlined"

const DisplayImage = () => {
    const data = JSON.parse(localStorage.getItem('myProfileImage'))

    return (
        <div>
            <Button
                startIcon={<Exit />}
                component={NavLink}

                to={{
                    pathname: "/setting",
                }}
            >
                Back to Profile
            </Button>
            <img style={{paddingTop:30}} src={data.media} alt="" />
        </div>
    )
}

export default DisplayImage
