import React, {useState, useEffect} from "react";
import classes from "../../classes.module.css";
import MySwitch from "../../components/MySwitch";
// import MySelect from '../../components/MySelect'
import {path} from "../../api/constants";

const Button = ({onClick}) => {
    return (
        <div onClick={onClick} style={{margin: "20px 0"}}>
            <div className={classes.redButton}>
                <p className={classes.buttonText}> Submit </p>
            </div>
        </div>
    );
};

const Match = props => {
    const [matches, setMatches] = useState([]);
    const [profile, setProfile] = useState(null);
    const [bools, setBools] = useState([false, false, false, false, false]);

    const setPreference = () => {
        // For setting preference, make a put request to URL/api/v1/profile/preference. You need to just only pass search id which you will get in the response of request to URL/api/v1/profile/. In response /profile you need to get the last element of searches array and get searches._id of the element.

        // if (!profile) return null;
        return ;
        // console.log(" profile ==== ", profile);
        // const id = profile.searches[profile.searches.length - 1]._id;
        const id = 0;
        fetch(`${path}/api/v1/profile/preference`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({id})
        })
            .then(e => e.json())
            .then(d => {
                console.log("d == ", d);
            })
            .catch(error => console.log(error));
    };

    const getProfile = () => {
        fetch(`${path}/api/v1/profile/`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            }
        })
            .then(e => e.json())
            .then(d => {
                if (d.success) {
                    setProfile(d.data);
                }
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        // getProfile();
    }, []);

    useEffect(() => {
        setMatches(
            props.location.state.matches.sort((a, b) => a.score < b.score)
        );
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
                                setPreference={index === 0 ? setPreference : null}
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
                {/* <Button onClick={setPreference} /> */}
            </div>
        </div>
    );
};

export default Match;
