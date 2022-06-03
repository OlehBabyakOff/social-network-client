import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    AvatarGroup,
    Box, Button, CircularProgress, Divider, IconButton,
    ImageList,
    ImageListItem, List,
    ListItem,
    ListItemAvatar, ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {observer} from "mobx-react-lite";
import {getFollowingsService, getLimitedUsers} from "../../api/userService";
import {Link, useHistory} from "react-router-dom";
import {Context} from "../../index.js";
import {ForwardToInboxOutlined} from "@mui/icons-material";
import {getLimitedGroupsService} from "../../api/groupService";
import {Skeleton} from "@mui/lab";
import {createConversationService} from "../../api/chatService";

const Rightbar = () => {

    const {store} = useContext(Context)
    const history = useHistory()

    const [users, setUsers] = useState([])
    const [groups, setGroups] = useState([])
    const [groupsMembers, setGroupsMembers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const fetchUsers = await getLimitedUsers()
            setUsers(fetchUsers.data)
            const fetchGroups = await getLimitedGroupsService()
            const {groups, groupMembers} = fetchGroups.data
            setGroups(groups)
            setGroupsMembers(groupMembers)
            await store.getUsers()
        }
        fetchData().then(() => setLoading(false))
    }, [])

    const createChat = async (userId) => {
        const chat = await createConversationService(userId)
        history.push(`/chat/${chat.data._id}`)
    }

    return (
        <Box flex={1.5} p="20px 46px" pl={0} sx={{ display: { xs: "none", sm: "block" }}}>
            <Box position="fixed" width={300} sx={{background: "#f9fafb", height: "100vh"}}>
                <Typography variant="h6" fontWeight={300} sx={{textAlign: 'center'}}>
                    Знайомтесь з новими людьми
                </Typography>

                <List sx={{ width: '100%', maxWidth: 360, background: "#f9fafb" }}>
                    {users.map(user => {
                        if (loading) {
                            return (<Skeleton variant="text" height={50} />)
                        } else {
                            return (
                                <ListItem key={user._id}
                                          secondaryAction={
                                                <Button onClick={() => createChat(user._id)}><ForwardToInboxOutlined/></Button>
                                          }
                                          disablePadding
                                >
                                    <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 1000 }} to={`/user/${user._id}`}>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={`data:buffer;base64,${user.avatar}`}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText primary={`${user.second_name} ${user.first_name}`} />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>)}})}
                </List>

                <Divider/>

                <Typography variant="h6" fontWeight={300} sx={{mt:3, textAlign: 'center'}}>
                    Вступайте до спільнот
                </Typography>

                <List sx={{ width: '100%', maxWidth: 360, background: "#f9fafb" }}>
                    {groups.map(group => {
                        if (loading) {
                            return (<Skeleton variant="text" height={50} />)
                        } else {
                        return (
                        <Link style={{textDecoration: 'inherit', color: 'inherit', width: 1000}}
                              to={`/group/${group._id}`}>
                            <ListItem
                                secondaryAction={
                                    <AvatarGroup max={3}>
                                        {groupsMembers.map(member => {
                                            const user = store.users.find(user => user._id === member.memberId)
                                            if (member.groupId === group._id) {
                                                return (
                                                    <Avatar alt={member._id} src={`data:buffer;base64,${user.avatar}`}/>
                                                )
                                            }
                                        })}
                                    </AvatarGroup>
                                }
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemText primary={group.title}/>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        )}})}
                </List>
            </Box>
        </Box>
    );
};

export default observer(Rightbar);