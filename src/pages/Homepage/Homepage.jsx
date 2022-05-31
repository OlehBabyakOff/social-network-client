import React, {useContext, useEffect} from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Button, Modal, Stack, Typography} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Profile from "../../components/Profile/Profile";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";
import {ErrorOutline} from "@mui/icons-material";

const Homepage = () => {

    const {store} = useContext(Context)
    const history = useHistory()

    // useEffect(() => {
    //     if (store.user.roles.isBlocked) {
    //         history.push('/me')
    //     }
    // }, [])

    const logout = async () => {
        await store.logout()
        history.push("/login")
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        outline: 'none'
    };

    return (
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar/>
            {store.user.roles.isBlocked ?
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Sidebar/>
                    <Profile/>
                    <Modal
                        open={true}
                        onClose={null}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Stack direction="row" spacing={1} sx={{color: '#A30000'}}>
                                <ErrorOutline sx={{marginTop: 0.5}}/>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Ваш акаунт заблоковано
                                </Typography>
                            </Stack>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Ваш акаунт було заблоковано адміністрацією через порушення правил.
                            </Typography>
                            <Button onClick={() => logout()} sx={{mt: 2}}>Вийти з акаунту</Button>
                        </Box>
                    </Modal>
                </Stack>
                :
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Sidebar/>
                <Profile/>
            </Stack>}
        </Box>
    );
};

export default observer(Homepage);