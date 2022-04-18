import {useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import News from "./pages/News/News";
import Homepage from "./pages/Homepage/Homepage";
import Friends from "./pages/Friends/Friends";
import Groups from "./pages/Groups/Groups";
import Messages from "./pages/Messages/Messages";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import PostDetail from "./pages/PostDetail/PostDetail";
import User from "./pages/User/User";
import Group from "./pages/Group/Group";
import Chat from "./pages/Chat/Chat";
import GroupChat from "./pages/GroupChat/GroupChat";

const App = () => {

    const [mode, setMode] = useState("light");
    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

  return (
    <>
        <ThemeProvider theme={darkTheme}>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <News/>
                    </Route>
                    <Route exact path='/me'>
                        <Homepage/>
                    </Route>
                    <Route exact path='/friends'>
                        <Friends/>
                    </Route>
                    <Route exact path='/groups'>
                        <Groups/>
                    </Route>
                    <Route exact path='/messages'>
                        <Messages/>
                    </Route>
                    <Route exact path='/post'>
                        <PostDetail/>
                    </Route>
                    <Route exact path='/user'>
                        <User/>
                    </Route>
                    <Route exact path='/group'>
                        <Group/>
                    </Route>
                    <Route exact path='/chat'>
                        <Chat/>
                    </Route>
                    <Route exact path='/groupChat'>
                        <GroupChat/>
                    </Route>
                    <Route path='*'>
                        <Redirect to="/"/>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    </>
  );
}

export default App;
