import React, {useEffect, useState} from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import GroupsList from "../../components/GroupsList/GroupsList";
import GroupsRightbar from "../../components/GroupsRightbar/GroupsRightbar";
import {getAllGroupsService, getMyGroupsService} from "../../api/groupService";

const Groups = () => {

    const [allGroups, setAllGroups] = useState([])
    const [groups, setGroups] = useState([])
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('Groups');
    const [isDisabled, setIsDisabled] = useState(true)
    const [searchedGroups, setSearchedGroups] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchGroups = await getMyGroupsService()
            setGroups(fetchGroups.data)
            const fetchAllGroups = await getAllGroupsService()
            setAllGroups(fetchAllGroups.data)
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

    const searchGroups = (title="") => {
        const searchGroups = allGroups.filter(group => group.title === title)
        setSearchedGroups(searchGroups)
        setIsDisabled(false)
        setValue("Search")
    }

    return (
        <>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar/>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Sidebar/>
                    <GroupsList groups={groups} setGroups={setGroups} reload={reload} setReload={setReload} loading={loading} setLoading={setLoading} value={value} setValue={setValue} isDisabled={isDisabled} setIsDisabled={setIsDisabled} searchedGroups={searchedGroups} setSearchedGroups={setSearchedGroups}/>
                    <GroupsRightbar searchGroups={searchGroups} allGroups={allGroups} value={value} setValue={setValue} reload={reload} setReload={setReload}/>
                </Stack>
            </Box>
        </>
    );
};

export default Groups;