import React, {useContext} from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import Rightbar from "../../components/Rightbar/Rightbar";
import SettingsUser from "../../components/Settings/SettingsUser";

const Settings = () => {

    const {store} = useContext(Context)

    return (
       <>
           <Box bgcolor={"background.default"} color={"text.primary"}>
               <Navbar/>
               <Stack direction="row" spacing={2} justifyContent="space-between">
                   <Sidebar/>
                   <SettingsUser/>
                   <Rightbar/>
               </Stack>
           </Box>
       </>
    );
};

export default observer(Settings);