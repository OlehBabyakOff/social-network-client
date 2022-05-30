import React, {useContext, useEffect, useState} from 'react';
import {
    Box
} from "@mui/material";
import CreatePostGroup from "../CreatePost/CreatePostGroup";
import PostGroup from "../Post/PostGroup";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const GroupBody = ({groupId, group, groupPosts, reload, setReload}) => {

    const {store} = useContext(Context)

    return (
            <Box flex={6} p={{ xs: 0, md: 2 }}>

                {group.creatorId === store?.user?._id ?
                    <CreatePostGroup groupId={groupId} reload={reload} setReload={setReload}/> : null}

                {groupPosts.map(post =>
                    <PostGroup post={post} groupId={groupId} key={post._id} reload={reload} setReload={setReload}/>
                )}
            </Box>
    );
};

export default observer(GroupBody);