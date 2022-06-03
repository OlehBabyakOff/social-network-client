import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Skeleton} from "@mui/lab";
import {BackspaceOutlined} from "@mui/icons-material";
import {kickUserService} from "../../api/groupService";

const GroupMembersList = ({group, member}) => {
    const {store} = useContext(Context)

    const [fetchUser, setFetchUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            await store.getUsers()
            setFetchUser(store.users.find(user => user._id === member.memberId))
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

    const kickUser = async (groupId, userId) => {
        await kickUserService(groupId, userId)
        setReload(!reload)
    }

    return (
        loading ? <Skeleton variant="text" height={100} /> :
            (<List dense sx={{width: '100%', maxWidth: 900, mt: 0,  background: "#f9fafb"}}>
                {member.memberId !== store?.user?._id ?
                (<ListItem sx={{lineHeight: 2, background: "#f9fafb"}}
                          disablePadding
                >
                    <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 1000 }} to={`/user/${member.memberId}`}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar sx={{width: 50, height: 50}}
                                        src={`data:buffer;base64,${fetchUser.avatar}`}
                                />
                            </ListItemAvatar>
                            <Typography variant="span" sx={{fontWeight: 500, ml: 2, fontSize: 16}}>{`${fetchUser.second_name} ${fetchUser.first_name}`}</Typography>
                        </ListItemButton>
                    </Link>
                    {group.creatorId === store.user._id ?
                        <BackspaceOutlined onClick={() => kickUser(group._id, member.memberId)} sx={{cursor: "pointer"}} color={'primary'}/>
                        : null}
                </ListItem>) :
                (<ListItem sx={{lineHeight: 2, background: "#f9fafb"}}
                           disablePadding
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{width: 50, height: 50}}
                                src={`data:buffer;base64,${store?.user?.avatar}`}
                        />
                    </ListItemAvatar>
                    <Typography variant="span" sx={{fontWeight: 500, ml: 2, fontSize: 16}}>Ви</Typography>
                </ListItem>
            </ListItem>)}
            </List>)
    );
};

export default observer(GroupMembersList);