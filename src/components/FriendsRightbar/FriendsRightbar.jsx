import React from 'react';
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";

const FriendsRightbar = () => {

    const friends = ["Oleh", "Max", "Daynil", "Petya"]

    return (
       <>
           <Box flex={2} p={3} pl={0} sx={{ display: { xs: "none", sm: "block" } }}>
               <Box position="fixed" width={300}>
                   <Typography variant="h6" fontWeight={300}>
                       Пошук нових друзів
                   </Typography>
                   <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       options={friends}
                       sx={{ width: 300, mt: 2 }}
                       renderInput={(params) =>
                           <TextField {...params} label="Пошук за прізвищем" />}
                   />
                   <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       options={friends}
                       sx={{ width: 300, mt: 2 }}
                       renderInput={(params) => <TextField {...params} label="Пошук за іменем" />}
                   />
                   <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       options={friends}
                       sx={{ width: 300, mt: 2 }}
                       renderInput={(params) => <TextField {...params} label="Пошук за логіном" />}
                   />
                   <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       options={friends}
                       sx={{ width: 300, mt: 2 }}
                       renderInput={(params) => <TextField {...params} label="Пошук за електронною адресою" />}
                   />
                   <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       options={friends}
                       sx={{ width: 300, mt: 2 }}
                       renderInput={(params) => <TextField {...params} label="Пошук за номером телефону" />}
                   />
                   <Button variant="text" sx={{mt: 2}}>Знайти</Button>
               </Box>
           </Box>
       </>
    );
};

export default FriendsRightbar;