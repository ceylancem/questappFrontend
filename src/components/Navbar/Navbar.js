import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./Navbar.scss";
import { LockOpen } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    link: {
      textDecoration: "none",
      boxShadow: "none",
      color: "white"
    }
  }));

function Navbar() {
    
    let history = useHistory();
    const classes = useStyles();
    const onClick = () => {
        console.log("START");
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userName")
        history.go(0)
        console.log("END");
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }} >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" textAlign="left" sx={{ flexGrow: 1 }}>
                            <Link className={classes.link} to="/">Home</Link>
                        </Typography>
                        <Typography variant="h6" component="div" >
                            { localStorage.getItem("currentUser") == null ?
                                <Link className={classes.link} to="/auth">Login/Register</Link> :
                                <div>
                                    <IconButton className="link" onClick={onClick}><LockOpen></LockOpen></IconButton>
                                    <Link className={classes.link} to={{ pathname: '/users/' + localStorage.getItem("currentUser") }}>
                                        Profile
                                    </Link>
                                </div> }
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar;