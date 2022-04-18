import React from 'react';
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";

const GroupsRightbar = () => {

    const groups = ["2ch", "igm", "lol"]

    return (
        <>
            <Box flex={2} p={3} pl={0} sx={{ display: { xs: "none", sm: "block" } }}>
                <Box position="fixed" width={300} sx={{background: "#f9fafb", height: "100vh"}}>
                    <Typography variant="h6" fontWeight={300}>
                        Пошук нових спільнот
                    </Typography>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={groups}
                        sx={{ width: 300, mt: 2 }}
                        renderInput={(params) =>
                            <TextField {...params} label="Пошук за назвою" />}
                    />
                    <Button variant="text" sx={{mt: 2}}>Знайти</Button>
                </Box>
            </Box>
        </>
    );
};

export default GroupsRightbar;