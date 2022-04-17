import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import GroupsList from "../../components/GroupsList/GroupsList";
import GroupsRightbar from "../../components/GroupsRightbar/GroupsRightbar";

const Groups = () => {
    return (
        <>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar/>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Sidebar/>
                    <GroupsList/>
                    <GroupsRightbar/>
                </Stack>
            </Box>
        </>
    );
};

export default Groups;