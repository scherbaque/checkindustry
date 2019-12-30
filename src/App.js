import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import classes from "./classes.module.css";
import Match from "./containers/Match";

function App() {
    return (
        <div className={classes.app}>
            <Router>
                <Header></Header>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/match" component={Match} />
                    <Route
                        render={() => (
                            <div>Sorry, this page does not exist. </div>
                        )}
                    />
                </Switch>
                <Footer></Footer>
            </Router>
        </div>
    );
}

export default App;
