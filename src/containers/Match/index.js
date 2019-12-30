import React, {useState} from "react";
import classes from "../../classes.module.css";
import MySwitch from "../../components/MySwitch";
// import MySelect from '../../components/MySelect'

const Button = () => {
    return (
        <div className={classes.redButton}>
            <p className={classes.buttonText}>Check</p>
        </div>
    );
};

const Match = () => {
    const [a, setA] = useState(false);
    return (
        <div className={classes.match}>
            <h1 className={classes.mainTitle}>
                Industries That Match Your Initial Search
            </h1>
            <div className={classes.matchCol}>
                <h5 className={classes.doesItMatch}> Does It Match? </h5>

                <div className={classes.matchCol}>
                    <MySwitch
                        title="Pharmacevtical"
                        active={a}
                        setActive={setA}
                    ></MySwitch>
                    <MySwitch
                        title="Mother"
                        active={a}
                        setActive={setA}
                    ></MySwitch>
                </div>
            </div>
        </div>
    );
};

export default Match;
