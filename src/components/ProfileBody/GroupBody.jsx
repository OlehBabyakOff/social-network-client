import React, {useContext, useEffect, useState} from 'react';
import {
    Box, Button, ButtonGroup, CircularProgress, Divider,
    List, ListItemButton, ListItemIcon, ListItemText,
    Stack,
} from "@mui/material";
import {
    Delete,
    ForwardToInboxOutlined, GroupAddOutlined, PersonAddAltOutlined, PersonRemoveAlt1Outlined, Settings,
} from "@mui/icons-material";
import CreatePostGroup from "../CreatePost/CreatePostGroup";
import PostGroup from "../Post/PostGroup";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {deleteGroupService, subscribeGroupService} from "../../api/groupService";
import {Link, useHistory} from "react-router-dom";

const GroupBody = ({groupId, group, members, groupPosts, reload, setReload}) => {

    const {store} = useContext(Context)
    const history = useHistory()

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

    const deleteGroup = async (id) => {
        await deleteGroupService(id)
        history.push('/groups')
    }

    return (
        loading ? <CircularProgress/> :
            <Box flex={6} p={{ xs: 0, md: 2 }}>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List component="nav" aria-label="main mailbox folders">
                        <Stack direction="row" spacing={1} justifyContent="space-evenly" sx={{mb: 1}}>
                            {group.creatorId !== store?.user?._id ?
                                isFollowed ?
                                        <ListItemButton sx={{maxWidth: 250}} onClick={() => followGroup(groupId)}>
                                            <ListItemIcon>
                                                <PersonRemoveAlt1Outlined />
                                            </ListItemIcon>
                                            <ListItemText primary="Відписатися" />
                                        </ListItemButton>
                                        :
                                        <ListItemButton sx={{maxWidth: 250}} onClick={() => followGroup(groupId)}>
                                            <ListItemIcon>
                                                <GroupAddOutlined />
                                            </ListItemIcon>
                                            <ListItemText primary="Підписатися" />
                                        </ListItemButton>
                                :
                                <>
                                    <ListItemButton sx={{maxWidth: 300}} onClick={() => deleteGroup(groupId)}>
                                        <ListItemIcon>
                                            <Delete />
                                        </ListItemIcon>
                                        <ListItemText primary="Видалити спільноту" />
                                    </ListItemButton>
                                    <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/group/${groupId}/settingsGroup`}>
                                        <ListItemButton sx={{maxWidth: 300}}>
                                            <ListItemIcon>
                                                <Settings />
                                            </ListItemIcon>
                                            <ListItemText primary="Налаштування спільноти" />
                                        </ListItemButton>
                                    </Link>
                                </>
                            }
                        </Stack>
                    </List>
                </Box>

                <Divider/>

                {group.creatorId === store?.user?._id ?
                <CreatePostGroup groupId={groupId} reload={reload} setReload={setReload}/> : null}

                {groupPosts.map(post =>
                    <PostGroup post={post} groupId={groupId} key={post._id} reload={reload} setReload={setReload}/>
                )}
            </Box>
    );
};

export default observer(GroupBody);