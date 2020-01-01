import React, {useState} from "react";
import classes from "../../classes.module.css";
import MySelect from "../../components/MySelect";
import IndustryList from "../../components/IndustryList";
import {path} from "../../api/constants";
import {bio} from "../../industries";

const data = bio;


const Button = ({onClick}) => {
    return (
        <div onClick={onClick} className={classes.redButton}>
            <p className={classes.buttonText}>Check</p>
        </div>
    );
};

const Home = ({history}) => {
    const [industry, setIndustry] = useState(null);
    const [sub, setSub] = useState(null);

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
                console.log("d == " ,d);
                if (d.success) {
                    history.push({
                        pathname: '/match',
                        state: { matches: d.data }
                    })
                }
            })
            .catch(error => console.log(error));
    };
    const handleRequest = () => {
        const token = localStorage.getItem("token");

        console.log("token ===", token);
        if (token) {
            sendRequest(token);
        }
        else {
            history.push('/login')
        }
    };

    const handleChangeSelect = (node) => {
        console.log("none = ", node)
        setSub(node.label);
    }

    return (
        <div className={classes.home}>
            <div className={classes.half}>
                <div className={classes.block}>
                    <IndustryList
                        industry={industry}
                        setIndustry={setIndustry}
                    />
                </div>
            </div>
            <div className={classes.half}>
                <div className={classes.block}>
                    <h1 className={classes.titleMain}>Pick Your Industry</h1>
                    <div className={classes.selectContainer}>
                        <MySelect onChange={handleChangeSelect} data={data} setCallback={setSub}></MySelect>
                    </div>
                    <Button onClick={handleRequest} />
                </div>
            </div>
        </div>
    );
};

export default Home;
