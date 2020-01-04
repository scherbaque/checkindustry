import React, {useState} from "react";
import classes from "../../classes.module.css";
import MySelect from "../../components/MySelect";
import IndustryList from "../../components/IndustryList";
import {path} from "../../api/constants";
import * as arrays from "../../industries";

const data = [
    // { #bug here
    //    label: "Bio & Nano Technology",
    //    value: 'Bio & Nano Technology',
    //    disabled: true,
    //    children:  [...arrays.bio]
    // }
    ...arrays.bio,
    ...arrays.assets,
    ...arrays.bio,
    ...arrays.business,
    ...arrays.family,
    ...arrays.it,
    ...arrays.legal,
    ...arrays.local,
    ...arrays.media,
    ...arrays.security,
    ...arrays.social
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
    const [sub, setSub] = useState('Biotechnology');

    const sendRequest = token => {
        const subIndustry = encodeURI(sub);
        fetch(`${path}/api/v1/profile/industry/${subIndustry}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
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
        const token = localStorage.getItem("token");

        console.log("token ===", token);
        if (token) {
            sendRequest(token);
        } else {
            history.push("/login");
        }
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
