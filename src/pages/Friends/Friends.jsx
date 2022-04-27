import React, {useContext, useEffect, useState} from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import FriendsList from "../../components/FriendsList/FriendsList";
import FriendsRightbar from "../../components/FriendsRightbar/FriendsRightbar";
import {observer} from "mobx-react-lite";
import {getAllUsers, getFollowersService, getFollowingsService} from "../../api/userService";
import {Context} from "../../index.js";

const Friends = () => {

    const {store} = useContext(Context)

    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const [users, setUsers] = useState([])
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('Subscriptions');
    const [isDisabled, setIsDisabled] = useState(true)
    const [searchedUsers, setSearchedUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchFollowers = await getFollowersService(store.user._id)
            setFollowers(fetchFollowers.data)
            const fetchFollowings = await getFollowingsService(store.user._id)
            setFollowings(fetchFollowings.data)
            const fetchUsers = await getAllUsers()
            setUsers(fetchUsers.data)
        }
        fetchData().then(() => setLoading(!loading))
    }, [reload])

    const searchUsers = (second_name="", first_name="", username="", email="", phone="") => {
        console.log(second_name)
        const searchUsers = users.filter(user => {
            return user.first_name === first_name || user.second_name === second_name
            || user.username === username || user.email === email ||
            user.phone === phone
        })
        setSearchedUsers(searchUsers)
        setIsDisabled(false)
        setValue("Search")
    }

    return (
       <>
           <Box bgcolor={"background.default"} color={"text.primary"}>
               <Navbar/>
               <Stack direction="row" spacing={2} justifyContent="space-between">
                   <Sidebar/>
                   <FriendsList followers={followers} followings={followings} reload={reload} setReload={setReload} loading={loading} users={users} value={value} setValue={setValue} isDisabled={isDisabled} setIsDisabled={setIsDisabled} searchedUsers={searchedUsers}/>
                   <FriendsRightbar followers={followers} followings={followings} reload={reload} setReload={setReload} users={users} searchUsers={searchUsers}/>
               </Stack>
           </Box>
       </>
    );
};

export default observer(Friends);