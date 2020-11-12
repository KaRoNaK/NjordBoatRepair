import React from "react";

import classes from "./Auth.module.css";

const auth = (props) => (
    <div className={classes.background}>
        <div className={classes.card}>
            <div className={classes.header}>
                <i>
                    <strong>NJORD</strong>
                </i>
            </div>
            <div className={classes.content}>{props.children}</div>
            <div className={classes.footer}>
                <u>Terms & Conditions </u>
            </div>
        </div>
    </div>
);

export default auth;
