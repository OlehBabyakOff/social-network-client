import React, {useContext} from 'react';
import {List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import Moment from 'react-moment';
import 'moment-timezone';

const InfoProfile = () => {

    const {store} = useContext(Context)

    return (
       <>
           <Paper elevation={3} sx={{p:2, background: "#f9fafb"}}>
               <Typography variant="h6" fontWeight={300} mt={2} mb={2}>
                   Інформація про користувача
               </Typography>
               <List>
                   <ListItem>
                       <ListItemText>
                           Прізвище: {store.user.second_name}
                       </ListItemText>
                   </ListItem>
                   <ListItem>
                       <ListItemText>
                           Ім'я: {store.user.first_name}
                       </ListItemText>
                   </ListItem>
                   <ListItem>
                       <ListItemText>
                           Електронна адреса: {store.user.email}
                       </ListItemText>
                   </ListItem>
                   <ListItem>
                       <ListItemText>
                           Номер телефону: {store.user.phone}
                       </ListItemText>
                   </ListItem>
                   <ListItem>
                       <ListItemText>
                           Дата народження: <Moment format="DD.MM.YYYY">{store.user.birthday.toString()}</Moment>
                       </ListItemText>
                   </ListItem>
               </List>
           </Paper>
       </>
    );
};

export default observer(InfoProfile);