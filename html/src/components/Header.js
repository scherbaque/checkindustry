import React, {useState, useEffect} from "react";
import classes from "../classes.module.css";
import {withRouter} from "react-router-dom";

const MyLink = withRouter(({label, route, history, onClick}) => {
    return (
        <div
            onClick={onClick ? onClick : () => history.push(route)}
            className={classes.link}
        >
            {label}
        </div>
    );
});

const Header = ({token, setToken}) => {

    return (
        <header className={classes.header}>
            <h2 className={classes.headerTitle}>Check your industry</h2>
            <div className={classes.row}>
                <MyLink label={"Home"} route={"/"} />
                {!token ? (
                    <MyLink label={"Login"} route={"/login"} />
                ) : (
                    <MyLink
                        label={"Logout"}
                        onClick={() => {
                            localStorage.removeItem("token");
                            setToken(null);
                        }}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
