import React from "react";
import classes from "../classes.module.css";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <h4 className={classes.copyright}>© { new Date().getFullYear()}, Check your industry</h4>
        </footer>
    );
};

export default Footer;
