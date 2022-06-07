import React from 'react';
import {
    Box
} from "@mui/material";
import {observer} from "mobx-react-lite";
import Post from "../Post/Post";

const UserBodyRight = ({userPosts, reload, setReload}) => {
    return (
        <Box flex={6} p={{ xs: 0, md: 2 }}>
            {userPosts.map(post =>
                (<Post post={post} reload={reload} setReload={setReload} key={post._id}
                       style={{ margin: 5,  width: "80%", ml:13, background: "#f9fafb" }}
                       imgStyle={{maxWidth: '950px', maxHeight: '478px', height: 'auto', width: 'auto', margin: "auto"}}/>)
            )}
        </Box>
    );
};

export default observer(UserBodyRight);