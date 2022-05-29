import {useContext, useEffect, useState} from "react";
import {io} from "socket.io-client"
import {Alert, CircularProgress, createTheme, ThemeProvider} from "@mui/material";
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
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import {observer} from "mobx-react-lite";
import {Context} from "./index.js";
import PostDetailGroup from "./pages/PostDetail/PostDetailGroup";
import Gallery from "./pages/Gallery/Gallery";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import GroupSettings from "./pages/Settings/GroupSettings";
import AlertMain from "./components/Alert/Alert";

const socket = io.connect("http://localhost:5000")

const App = () => {

    const {store} = useContext(Context)

    const [mode, setMode] = useState("light");
    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        } else {
            store.setLoading(false)
        }
    }, [])

  return (
      store.loading ? <CircularProgress sx={{position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'}}/> :
        <>
            {store.errors.length > 0 ? <AlertMain/> : null}
            <ThemeProvider theme={darkTheme}>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            {store.user ? <News/> : <Login/>}
                        </Route>
                        <Route exact path='/me'>
                            {store.user ? <Homepage/> : <Login/>}
                        </Route>
                        <Route exact path='/friends'>
                            {store.user ? <Friends/> : <Login/>}
                        </Route>
                        <Route exact path='/groups'>
                            {store.user ? <Groups/> : <Login/>}
                        </Route>
                        <Route exact path='/messages'>
                            {store.user ? <Messages/> : <Login/>}
                        </Route>
                        <Route exact path='/post/:postId'>
                            {store.user ? <PostDetail/> : <Login/>}
                        </Route>
                        <Route exact path='/group/:groupId/post/:postId'>
                            {store.user ? <PostDetailGroup/> : <Login/>}
                        </Route>
                        <Route exact path='/user/:userId'>
                            {store.user ? <User/> : <Login/>}
                        </Route>
                        <Route exact path='/group/:groupId'>
                            {store.user ? <Group/> : <Login/>}
                        </Route>
                        <Route exact path='/chat/:userId'>
                            {store.user ? <Chat socket={socket}/> : <Login/>}
                        </Route>
                        <Route exact path='/gallery'>
                            {store.user ? <Gallery/> : <Login/>}
                        </Route>
                        <Route exact path='/settings'>
                            {store.user ? <Settings/> : <Login/>}
                        </Route>
                        <Route exact path='/group/:groupId/settingsGroup'>
                            {store.user ? <GroupSettings/> : <Login/>}
                        </Route>
                        <Route exact path='/registration'>
                            {store.user ? <Redirect to='/'/> : <Registration/>}
                        </Route>
                        <Route exact path='/login'>
                            {store.user ? <Redirect to='/'/> : <Login/>}
                        </Route>
                        <Route exact path='/dashboard/*'>
                            {store.user ? <Dashboard/> : <Login/>}
                        </Route>
                        <Route path='*'>
                            {store.user ? <Redirect to='/'/> : <Login/>}
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </>
  );
}

export default observer(App);
