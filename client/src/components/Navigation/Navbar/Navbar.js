import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navbar.module.css";

const navbar = () => {
    return (
        <div className={classes.Navbar}>
            <div className={classes.HamIcon}>
                <div className={classes.HamIconElement}></div>
                <div className={classes.HamIconElement}></div>
                <div className={classes.HamIconElement}></div>
            </div>
            <NavLink to="/">
                <div className={classes.Logo}>
                    <i>
                        <strong>NJORD</strong>
                    </i>
                </div>
            </NavLink>
        </div>
    );
};

export default navbar;
