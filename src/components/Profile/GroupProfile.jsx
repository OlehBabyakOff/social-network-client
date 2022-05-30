import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    CardContent,
    CardMedia,
    Divider,
    List,
    ListItemButton,
    ListItemIcon, ListItemText,
    Stack,
    Typography
} from "@mui/material";
import GroupBody from "../ProfileBody/GroupBody";
import GroupMembers from "../ProfileBody/GroupMembers";
import {Link, useHistory, useParams} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {
    deleteGroupService,
    getGroupMembersService,
    getGroupPostsService,
    getGroupService,
    subscribeGroupService
} from "../../api/groupService";
import {Delete, GroupAddOutlined, PersonRemoveAlt1Outlined, Settings} from "@mui/icons-material";

const GroupProfile = () => {

    const {groupId} = useParams()
    const {store} = useContext(Context)
    const history = useHistory()

    const [group, setGroup] = useState({})
    const [groupPosts, setGroupPosts] = useState([])
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(true)
    const [isFollowed, setIsFollowed] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const fetchGroup = await getGroupService(groupId)
            setGroup(fetchGroup.data)
            const fetchPosts = await getGroupPostsService(groupId)
            setGroupPosts(fetchPosts.data)
            const fetchFollowings = await getGroupMembersService(groupId)
            setMembers(fetchFollowings.data)
            fetchFollowings.data.filter(member => member.memberId === store?.user?._id ? setIsFollowed(true) : setIsFollowed(false))
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

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
        loading ? null :
            (<Box flex={10}>
                <CardMedia
                    component="img"
                    height="400"
                    image={`data:buffer;base64,${group.background}`}
                    alt="Paella dish"
                />
                <CardMedia
                    component="img"
                    sx={{borderRadius: 50, borderColor: "white", height: 200, width: 200, mt: -13, ml: 86}}
                    image={`data:buffer;base64,${group.avatar}`}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="h5" sx={{display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 500}}>
                        {group.title}
                    </Typography>
                    <Typography variant="span" sx={{display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 400,
                        fontSize: 18}}>
                        {members.length} учасників
                    </Typography>
                </CardContent>
                <Divider/>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List component="nav" aria-label="main mailbox folders">
                        <Stack direction="row" spacing={1} justifyContent="space-evenly" sx={{marginX: 20}}>
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
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <GroupMembers members={members} loading={loading} setLoading={setLoading}/>
                    <GroupBody groupId={groupId} group={group} members={members} groupPosts={groupPosts} reload={reload} setReload={setReload}/>
                </Stack>
            </Box>)
    );
};

export default observer(GroupProfile);