import React from "react";
import classes from "../../classes.module.css";
// import MySelect from '../../components/MySelect'

const Button = () => {
    return (
        <div className={classes.redButton}>
            <p className={classes.buttonText}>Check</p>
        </div>
    );
};

const Home = () => {
    return (
        <div className={classes.home}>
            <div className={classes.half}>
                <div className={classes.block}>
                    <p className={classes.text}>
                        Laoreet odio viverra et nibh dictumst elementum,
                        sagittis sit. Risus amet morbi egestas fames massa,
                        ullamcorper. Diam semper egestas amet, enim congue et.
                        Rhoncus diam facilisi egestas imperdiet lorem dis
                        dignissim diam amet. Eget donec egestas enim sed nibh
                        id. Vulputate euismod consequat.
                    </p>
                </div>
            </div>
            <div className={classes.half}>
                <div className={classes.block}>
                    <h1 className={classes.titleMain}>Pick Your Industry</h1>
                    {/* <MySelect></MySelect> */}
                    <Button />
                </div>
            </div>
        </div>
    );
};

export default Home;
