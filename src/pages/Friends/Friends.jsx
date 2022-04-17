import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import FriendsList from "../../components/FriendsList/FriendsList";
import FriendsRightbar from "../../components/FriendsRightbar/FriendsRightbar";


const Friends = () => {
    return (
       <>
           <Box bgcolor={"background.default"} color={"text.primary"}>
               <Navbar/>
               <Stack direction="row" spacing={2} justifyContent="space-between">
                   <Sidebar/>
                   <FriendsList/>
                   <FriendsRightbar/>
               </Stack>
           </Box>
       </>
    );
};

export default Friends;