import { FormControl, InputLabel, Input, Button, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Auth() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory();

    const handleUsername = (value) => {
        setUsername(value);
        console.log("userName : " + value);
    }

    const handlePassword = (value) => {
        setPassword(value);
        console.log("password : " + value);
    }

    const sendRequest = (path) => {
        fetch("/auth/" + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: username,
                password: password,
            }),
        }).then((res) => res.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.message);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", username)
                console.log("RES tokenKey : " + localStorage.getItem("tokenKey"));
                console.log("RES currentUser : " + localStorage.getItem("currentUser"));
                console.log("RES userName : " + localStorage.getItem("userName"));
            })
            .catch((err) => console.log("ERR -> " + err.message))
            console.log("GET ERROR");
    }

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        //history.go("/auth")
    }

    return (
        <FormControl>
            <InputLabel style={{ top: 10 }}>Username</InputLabel>
            <Input style={{ top: 20 }} onChange={(i) => handleUsername(i.target.value)} />
            <InputLabel style={{ top: 80 }}>Password</InputLabel>
            <Input style={{ top: 40 }}
                onChange={(i) => handlePassword(i.target.value)} />
            <Button variant="contained"
                style={{
                    color: "white",
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    marginTop: 60
                }}
                onClick={() => handleButton("register")}>Register
            </Button>
            <FormHelperText style={{ margin: 20 }}>
                Are you already registered?
            </FormHelperText>
            <Button variant="contained"
                style={{
                    color: "white",
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                }}
                onClick={() => handleButton("login")}>
                Login
            </Button>
        </FormControl>
    )
}

export default Auth;