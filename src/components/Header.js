import React from "react";
import classes from "../classes.module.css";
import {withRouter} from "react-router-dom";

const MyLink = withRouter(({label, route, history}) => {
    return (
        <div onClick={() => history.push(route)} className={classes.link}>
            {label}
        </div>
    );
});

const links = [
    {
        label: "Home",
        route: "/"
    },
    {
        label: "Login",
        route: "/login"
    },
]

const Header = () => {
    return (
        <header className={classes.header}>
            <h2 className={classes.headerTitle}>Check your industry</h2>
            <div className={classes.row}>
                {links.map((e, index) => (
                    <MyLink key={index} label={e.label} route={e.route} />
                ))}
            </div>
        </header>
    );
};

export default Header;
