import React from "react";
import classes from "../classes.module.css";
// import {industries} from "../industries"; uncomment later

const industries = []

const IndustryList = ({industry, setIndustry}) => {
    return (
        <div className={classes.industryList}>
            {industries.map((e, index) => (
                <h6
                    key={index}
                    onClick={() => setIndustry(e)}
                    className={
                        e === industry
                            ? classes.industrySelected
                            : classes.industry
                    }
                >
                    {e}
                </h6>
            ))}
        </div>
    );
};

export default IndustryList;
