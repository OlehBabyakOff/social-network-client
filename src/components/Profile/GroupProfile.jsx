import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, CardContent, CardMedia, Divider, Stack, Typography} from "@mui/material";
import GroupBody from "../ProfileBody/GroupBody";
import GroupMembers from "../ProfileBody/GroupMembers";
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {getGroupMembersService, getGroupPostsService, getGroupService} from "../../api/groupService";

const GroupProfile = () => {

    const {groupId} = useParams()
    const {store} = useContext(Context)

    const [group, setGroup] = useState({})
    const [groupPosts, setGroupPosts] = useState([])
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const fetchGroup = await getGroupService(groupId)
            setGroup(fetchGroup.data)
            const fetchPosts = await getGroupPostsService(groupId)
            setGroupPosts(fetchPosts.data)
            const fetchFollowings = await getGroupMembersService(groupId)
            setMembers(fetchFollowings.data)
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

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
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <GroupMembers members={members} loading={loading} setLoading={setLoading}/>
                    <GroupBody groupId={groupId} group={group} members={members} groupPosts={groupPosts} reload={reload} setReload={setReload}/>
                </Stack>
            </Box>)
    );
};

export default observer(GroupProfile);