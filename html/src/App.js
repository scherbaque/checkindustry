import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import classes from "./classes.module.css";
import Match from "./containers/Match";

const Navigator = () => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        var url = new URL(window.location.href);
        var param = url.searchParams.get("jwt");
        if (param) {
            localStorage.setItem('token', param);
            setToken(param);
        }
    }, [window.location.href]);
    return (
        <>
            <Header token={token} setToken={setToken}></Header>
            <Switch>
                <Route exact path="/" component={Home} />
                {/* <Route path="/login" component={Login} /> */}
                <Route path="/match" component={Match} />
                <Route
                    render={() => <div>Sorry, this page does not exist. </div>}
                />
            </Switch>
            <Footer></Footer>
        </>
    );
};
function App() {
    return (
        <div className={classes.app}>
            <Router>
                <Navigator />
            </Router>
        </div>
    );
}

export default App;
