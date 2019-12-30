import React from "react";
import classes from "../../classes.module.css";
import {ReactComponent as LinkedinIcon} from "../../assets/linkedin.svg";
import {ReactComponent as LinkedinLogo} from "../../assets/in.svg";

const LinkedinInput = () => {
    return (
        <div className={classes.loginBox}>
            <LinkedinIcon
                style={{position: "relative"}}
                height={56}
            ></LinkedinIcon>
            <LinkedinLogo
                style={{marginLeft: 10, position: "absolute"}}
                height={56}
            ></LinkedinLogo>
            <h3 className={classes.loginTitle}>Sign in with LinkedIn</h3>
        </div>
    );
};

const Login = () => {
    return (
        <div className={classes.login}>
            <div className={classes.loginBlock}>
                <h1 className={classes.mainTitle}>
                    Sign In to Check Your Industry
                </h1>
                <LinkedinInput></LinkedinInput>
            </div>
        </div>
    );
};

export default Login;
