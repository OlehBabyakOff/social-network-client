import React, {useState} from 'react';
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";

const FriendsRightbar = ({users, searchUsers}) => {

    const secondName = []
    const firstName = []
    const username = []
    const email = []
    const phone = []

    users.map(user => {
        secondName.push(user.second_name)
        firstName.push(user.first_name)
        username.push(user.username)
        email.push(user.email)
        phone.push(user.phone)
    })

    const [secondNameState, setSecondNameState] = useState("")
    const [firstNameState, setFirstNameState] = useState("")
    const [usernameState, setUsernameState] = useState("")
    const [emailState, setEmailState] = useState("")
    const [phoneState, setPhoneState] = useState("")

    const onSelectSecond = (e, value) => {
        setSecondNameState(value)
    }

    const onSelectFirst = (e, value) => {
        setFirstNameState(value)
    }

    const onSelectUsername = (e, value) => {
        setUsernameState(value)
    }

    const onSelectEmail = (e, value) => {
        setEmailState(value)
    }

    const onSelectPhone = (e, value) => {
        setPhoneState(value)
    }

    return (
       <>
           <Box flex={1.5} p="20px 50px" pl={0} sx={{ display: { xs: "none", sm: "block" } }}>
               <Box position="fixed" width={300} sx={{background: "#f9fafb", height: "100vh"}}>
                   <Typography variant="h6" fontWeight={300}>
                       Пошук нових друзів
                   </Typography>
                   <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       options={secondName}
                       onChange={onSelectSecond}
                       onInputChange={e => setSecondNameState(e.target.value)}
                       sx={{ width: 300, mt: 2 }}
                       freeSolo
                       renderInput={(params) =>
                           <TextField {...params} label="Пошук за прізвищем"/>}
                   />
                   <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       options={firstName}
                       onChange={onSelectFirst}
                       onInputChange={e => setFirstNameState(e.target.value)}
                       sx={{ width: 300, mt: 2 }}
                       freeSolo
                       renderInput={(params) => <TextField {...params} label="Пошук за іменем" />}
                   />
                   <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       options={username}
                       onChange={onSelectUsername}
                       onInputChange={e => setUsernameState(e.target.value)}
                       sx={{ width: 300, mt: 2 }}
                       freeSolo
                       renderInput={(params) => <TextField {...params} label="Пошук за логіном" />}
                   />
                   <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       options={email}
                       onChange={onSelectEmail}
                       onInputChange={e => setEmailState(e.target.value)}
                       sx={{ width: 300, mt: 2 }}
                       freeSolo
                       renderInput={(params) => <TextField {...params} label="Пошук за електронною адресою" />}
                   />
                   <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       options={phone}
                       onChange={onSelectPhone}
                       onInputChange={e => setPhoneState(e.target.value)}
                       sx={{ width: 300, mt: 2 }}
                       freeSolo
                       renderInput={(params) => <TextField {...params} label="Пошук за номером телефону" />}
                   />
                   <Button variant="text" sx={{mt: 2}} onClick={() => searchUsers(secondNameState, firstNameState, usernameState, emailState, phoneState)}>Знайти</Button>
               </Box>
           </Box>
       </>
    );
};

export default observer(FriendsRightbar);