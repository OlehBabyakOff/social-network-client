import React from 'react';
import {
    Box,
   Paper,
    Typography
} from "@mui/material";
import GroupMembersSearch from "../Search/GroupMembersSearch";
import GroupMembersList from "../GroupMembersList/GroupMembersList";

const GroupMembers = ({members, loading, setLoading, reload, setReload}) => {
    return (
        <Box flex={3} p={{ xs: 0, md: 2 }}>
            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <Paper elevation={3} sx={{p:2, background: "#f9fafb"}}>
                    <Typography variant="h6" fontWeight={300} mt={2} mb={2}>
                        Учаники спільноти
                    </Typography>
                    <GroupMembersSearch/>

                    {members.length > 0 ? members.map(member => (
                        <GroupMembersList member={member}/>
                    )) : null}

                </Paper>
            </Box>
        </Box>
    );
};

export default GroupMembers;