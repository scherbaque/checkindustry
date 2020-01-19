import React, {useState} from "react";
import classes from "../../classes.module.css";
import MySelect from "../../components/MySelect";
import IndustryList from "../../components/IndustryList";
import {path} from "../../api/constants";
import * as arrays from "../../industries";

const setEnabled = arr => {
    return arr.map(e => ({...e, disabled: false}));
};

const data = [
    {
        label: "Bio & Nano Technology",
        value: "Bio & Nano Technology",
        disabled: true,
        children: [...setEnabled(arrays.bio)]
    },
    {
        label: "Business",
        value: "Business",
        disabled: true,
        children: [...setEnabled(arrays.business)]
    },
    {
        label: "Social",
        value: "Social",
        disabled: true,
        children: [...setEnabled(arrays.social)]
    },
    {
        label: "Family & Home",
        value: "Family & Home",
        disabled: true,
        children: [...setEnabled(arrays.family)]
    },
    {
        label: "Assets & Finance",
        value: "Assets & Finance",
        disabled: true,
        children: [...setEnabled(arrays.assets)]
    },
    {
        label: "Information Technology",
        value: "Information Technology",
        disabled: true,
        children: [...setEnabled(arrays.it)]
    },
    {
        label: "Legal",
        value: "Legal",
        disabled: true,
        children: [...setEnabled(arrays.legal)]
    },
    {
        label: "Local",
        value: "Local",
        disabled: true,
        children: [...setEnabled(arrays.local)]
    },
    {
        label: "Media & Entertainment",
        value: "Media & Entertainment",
        disabled: true,
        children: [...setEnabled(arrays.media)]
    },
    {
        label: "Security",
        value: "Security",
        disabled: true,
        children: [...setEnabled(arrays.security)]
    },
    {
        label: "Social",
        value: "Social",
        disabled: true,
        children: [...setEnabled(arrays.social)]
    }
];

const Button = ({onClick}) => {
    return (
        <div onClick={onClick} className={classes.redButton}>
            <p className={classes.buttonText}>Check</p>
        </div>
    );
};

const Home = ({history}) => {
    const [industry, setIndustry] = useState(null);
    const [sub, setSub] = useState("Biotechnology");

    const sendRequest = () => {
        const subIndustry = encodeURI(sub);
        fetch(`${path}/api/v1/profile/industry/${subIndustry}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        })
            .then(e => e.json())
            .then(d => {
                console.log("d == ", d);
                if (d.success) {
                    history.push({
                        pathname: "/match",
                        state: {matches: d.data}
                    });
                }
            })
            .catch(error => console.log(error));
    };
    const handleRequest = () => {
        sendRequest();
    };

    const handleChangeSelect = node => {
        console.log("none = ", node);
        setSub(node.label);
    };

    console.log("data === === ", arrays);

    return (
        <div className={classes.home}>
            <div className={classes.half}>
                <div className={classes.block}>
                    <p className={classes.text}>
                        Listing your startup and choosing the right category (or
                        industry) for your business is an important step in your
                        fundraising and business development activities. There
                        are hundreds of industries in the tech world, and dozens
                        of new industries emerge every year. It’s hard to keep
                        track of all the changes.
                        <br />
                        <br />
                        This service offers you to check which industries are
                        most frequently mentioned together with your industry.
                        Please choose the industry from the dropdown menu to see
                        5 neighboring industries (from our database of 500+
                        categories).
                    </p>
                </div>
            </div>
            <div className={classes.half}>
                <div className={classes.pickBlock}>
                    <h1 className={classes.titleMain}>Pick Your Industry</h1>
                    {/* <IndustryList
                        industry={industry}
                        setIndustry={setIndustry}
                    /> */}
                    <div className={classes.selectContainer}>
                        <MySelect
                            onChange={handleChangeSelect}
                            data={data}
                            setCallback={setSub}
                        ></MySelect>
                    </div>
                    <Button onClick={handleRequest} />
                </div>
            </div>
        </div>
    );
};

export default Home;
