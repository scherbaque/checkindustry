import React from "react";
import Switch from "react-switch";
import classes from "../../classes.module.css";

const Checked = () => <p className={classes.checkedIcon}> Yes </p>
const Unchecked = () => <p className={classes.uncheckedIcon}> No </p>

const MySwitch = ({title, setActive, active, setPreference}) => {
    const handleToggle = (e) => {
        if (setPreference){setPreference()}
        setActive(e)
    }
    return (
        <div className={classes.switchRow}>
            <h5 className={classes.switchTitle}>{title}</h5>
            <Switch
                checkedIcon={<Checked></Checked>}
                uncheckedIcon={<Unchecked></Unchecked>}
                onChange={handleToggle}
                checked={active}
                // onColor={theme.colors.greenMain}
                height={32}
                width={88}
            />
        </div>
    );
};

export default MySwitch;
