import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { makeStyles } from "@mui/styles";
import PostForm from "../Post/PostForms";
//import Container from '@mui/material/Container';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f5ff"
    }
}));

function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const classes = useStyles();

    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result)
                },
                (error) => {
                    console.log("HATA : " + error);
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshPosts()
    }, [postList])

    if (error) {
        return <div> Error !!!</div>;
    } else if (!isLoaded) {
        return <div> Loading ...</div>;
    } else {
        return (
            <div className={classes.container}>
                {localStorage.getItem("currentUser") == null ? "" :
                    <PostForm 
                        userId={localStorage.getItem("currentUser")}
                        userName={localStorage.getItem("userName")}
                        refreshPosts={refreshPosts} />}

                {postList.map(post => (
                    <Post likes={post.postLikes}
                        postId={post.id}
                        userId={post.userId}
                        userName={post.userName}
                        title={post.title}
                        text={post.text} ></Post>
                ))}
            </div>
        );
    }

}

export default Home;