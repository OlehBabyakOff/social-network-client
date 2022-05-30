import React, {useState} from 'react';
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";

const GroupsRightbar = ({allGroups, searchGroups, value, setValue, reload, setReload}) => {

    const title = []

    allGroups.map(group => {
        title.push(group.title)
    })

    const [titleState, setTitleState] = useState("")

    const onSelectTitle = (e, value) => {
        setTitleState(value)
    }

    return (
        <>
            <Box flex={1.5} p="20px 50px" pl={0} sx={{ display: { xs: "none", sm: "block" } }}>
                <Box position="fixed" width={300} sx={{background: "#f9fafb", height: "100vh"}}>
                    <Typography variant="h6" fontWeight={300} sx={{textAlign: "center"}}>
                        Пошук нових спільнот
                    </Typography>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={title}
                        onChange={onSelectTitle}
                        onInputChange={e => setTitleState(e.target.value)}
                        sx={{ width: 300, mt: 2 }}
                        renderInput={(params) =>
                            <TextField {...params} label="Пошук за назвою" />}
                    />
                    <Button variant="text" sx={{mt: 2}} onClick={() => searchGroups(titleState)}>Знайти</Button>
                </Box>
            </Box>
        </>
    );
};

export default GroupsRightbar;