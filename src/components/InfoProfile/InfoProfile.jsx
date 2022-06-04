import React, {useContext} from 'react';
import {Divider, List, ListItem, ListItemText, Paper, Stack, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import Moment from 'react-moment';
import 'moment-timezone';
import {
    AssignmentIndOutlined,
    BadgeOutlined,
    CakeOutlined,
    Email,
    EmailOutlined,
    PhoneIphoneOutlined
} from "@mui/icons-material";

const InfoProfile = () => {

    const {store} = useContext(Context)

    return (
       <>
           <Paper elevation={3} sx={{p:2, background: "#f9fafb", marginTop: 3}}>
               <List>
                   <ListItem>
                       <ListItemText>
                           <Stack direction={'row'}>
                               <BadgeOutlined sx={{mr: 1}}/>
                               Прізвище: {store.user.second_name}
                           </Stack>
                       </ListItemText>
                   </ListItem>
                   <Divider/>
                   <ListItem>
                       <ListItemText>
                           <Stack direction={'row'}>
                               <AssignmentIndOutlined sx={{mr: 1}}/>
                               Ім'я: {store.user.first_name}
                           </Stack>
                       </ListItemText>
                   </ListItem>
                   <Divider/>
                   <ListItem>
                       <ListItemText>
                           <Stack direction={'row'}>
                               <EmailOutlined sx={{mr: 1}}/>
                               Електронна адреса: {store.user.email}
                           </Stack>
                       </ListItemText>
                   </ListItem>
                   <Divider/>
                   <ListItem>
                       <ListItemText>
                           <Stack direction={'row'}>
                               <PhoneIphoneOutlined sx={{mr: 1}}/>
                                Номер телефону: {store.user.phone}
                           </Stack>
                       </ListItemText>
                   </ListItem>
                   <Divider/>
                   <ListItem>
                       <ListItemText>
                           <Stack direction={'row'}>
                               <CakeOutlined sx={{mr: 1}}/>
                                Дата народження: <Moment format="DD.MM.YYYY" style={{marginLeft: '5px'}}>{store.user.birthday.toString()}</Moment>
                           </Stack>
                       </ListItemText>
                   </ListItem>
               </List>
           </Paper>
       </>
    );
};

export default observer(InfoProfile);