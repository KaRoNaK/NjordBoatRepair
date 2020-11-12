import React from "react";

import Navbar from "../Navigation/Navbar/Navbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";
import classes from "./Layout.module.css";

const layout = (props) => {
    return (
        <>
            <Navbar />
            <Sidedrawer />
            <div className={classes.Content}>{props.children}</div>
        </>
    );
};

export default layout;
