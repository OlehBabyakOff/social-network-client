import React, {useContext} from 'react';
import {
    Box, CardContent, CardMedia, Divider, Stack, Typography
} from "@mui/material";
import ProfileBodyLeft from "../ProfileBody/ProfileBodyLeft";
import ProfileBodyRight from "../ProfileBody/ProfileBodyRight";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";

const Profile = () => {

    const {store} = useContext(Context)

    return (
        <Box flex={10}>

                <CardMedia
                    component="img"
                    height="400"
                    image={`data:buffer;base64,${store.user.background}`}
                    alt="Paella dish"
                />
                <CardMedia
                    component="img"
                    sx={{borderRadius: 50, borderColor: "white", height: 200, width: 200, mt: -13, ml: 86}}
                    image={`data:buffer;base64,${store.user.avatar}`}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="h5" sx={{display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 500}}>
                        {`${store.user.second_name} ${store.user.first_name}`}
                    </Typography>
                    <Typography variant="h6" sx={{display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 400}}>
                        @{store.user.username}
                    </Typography>
                </CardContent>
                <Divider/>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <ProfileBodyLeft/>
                <ProfileBodyRight/>
            </Stack>

        </Box>
    );
};

export default observer(Profile);