import {useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import News from "./pages/News/News";
import Homepage from "./pages/Homepage/Homepage";
import Friends from "./pages/Friends/Friends";
import Groups from "./pages/Groups/Groups";
import Messages from "./pages/Messages/Messages";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

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
