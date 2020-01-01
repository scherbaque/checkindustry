import React, {useState, useEffect} from "react";
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

const Match = props => {
    const [matches, setMatches] = useState([]);
    const [bools, setBools] = useState([false, false, false, false, false]);

    useEffect(() => {
        setMatches(props.location.state.matches.sort((a, b) => a.score < b.score));
    }, [props.location.state]);

    return (
        <div className={classes.match}>
            <h1 className={classes.mainTitle}>
                Industries That Match Your Initial Search
            </h1>
            <div className={classes.matchCol}>
                <h5 className={classes.doesItMatch}> Does It Match? </h5>

                <div className={classes.matchCol}>
                    {matches.map((e, index) => {
                        return (
                            <MySwitch
                                title={e.title}
                                active={bools[index]}
                                setActive={newBool =>
                                    setBools(
                                        bools.map((bool, i) =>
                                            i === index ? newBool : bool
                                        )
                                    )
                                }
                            ></MySwitch>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Match;
