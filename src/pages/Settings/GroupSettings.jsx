import React, {useContext, useEffect} from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import Rightbar from "../../components/Rightbar/Rightbar";
import SettingsUser from "../../components/Settings/SettingsUser";
import SettingsGroup from "../../components/Settings/SettingsGroup";
import {useHistory} from "react-router-dom";

const GroupSettings = () => {

    const {store} = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        if (store.user.roles.isBlocked) {
            history.push('/me')
        }
    }, [])

    return (
       <>
           <Box bgcolor={"background.default"} color={"text.primary"}>
               <Navbar/>
               <Stack direction="row" spacing={2} justifyContent="space-between">
                   <Sidebar/>
                   <SettingsGroup/>
                   <Rightbar/>
               </Stack>
           </Box>
       </>
    );
};

export default observer(GroupSettings);