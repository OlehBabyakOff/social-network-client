import React, {useContext, useEffect, useState} from 'react';
import {
    Box, Button, ButtonGroup, CircularProgress, Divider,
    List,
    Stack,
} from "@mui/material";
import {
    Delete,
    ForwardToInboxOutlined, GroupAddOutlined, PersonAddAltOutlined, PersonRemoveAlt1Outlined,
} from "@mui/icons-material";
import CreatePostGroup from "../CreatePost/CreatePostGroup";
import PostGroup from "../Post/PostGroup";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {followUserService} from "../../api/userService";
import {subscribeGroupService} from "../../api/groupService";

const GroupBody = ({groupId, group, members, groupPosts, reload, setReload}) => {

    const {store} = useContext(Context)

    const [isFollowed, setIsFollowed] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        members.filter(member => member.memberId === store?.user?._id ? setIsFollowed(true) : setIsFollowed(false))
        setLoading(false)
    }, [])

    const followGroup = async (id) => {
        await subscribeGroupService(id)
        setIsFollowed(!isFollowed)
        setReload(!reload)
    }

    return (
        loading ? <CircularProgress/> :
            <Box flex={6} p={{ xs: 0, md: 2 }}>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List component="nav" aria-label="main mailbox folders">
                        <Stack direction="row" spacing={1} justifyContent="space-evenly" sx={{mb: 1}}>
                            {group.creatorId !== store?.user?._id ?
                                isFollowed ?
                                        <Button onClick={() => followGroup(groupId)}><PersonRemoveAlt1Outlined sx={{mr: 1}}/> Відписатися ({members.length})</Button>
                                        :
                                        <Button onClick={() => followGroup(groupId)}><GroupAddOutlined sx={{mr: 1}}/> Підписатися ({members.length})</Button>
                                :
                                <Button><Delete sx={{mr: 1}}/> Видалити спільноту ({members.length})</Button>
                            }
                            <Button><ForwardToInboxOutlined sx={{mr: 1}}/> Чат спільноти</Button>
                        </Stack>
                    </List>
                </Box>

                <Divider/>

                {group.creatorId === store?.user?._id ?
                <CreatePostGroup/> : null}

                {groupPosts.map(post =>
                    <PostGroup post={post}/>
                )}
            </Box>
    );
};

export default observer(GroupBody);