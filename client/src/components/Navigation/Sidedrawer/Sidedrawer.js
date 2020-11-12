import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Sidedrawer.module.css";

const sidedrawer = () => {
    return (
        <div className={classes.Sidedrawer}>
            <NavLink
                className={classes.NavItem}
                to="/"
                activeClassName={classes.active}
                exact
            >
                Dashboard
            </NavLink>
            <NavLink
                className={classes.NavItem}
                to="/job-ads"
                activeClassName={classes.active}
            >
                Job Ads
            </NavLink>
            <NavLink
                className={classes.NavItem}
                to="/proposals"
                activeClassName={classes.active}
                exact
            >
                Proposals
            </NavLink>
            <NavLink
                className={classes.NavItem}
                to="/reviews"
                activeClassName={classes.active}
                exact
            >
                Reviews
            </NavLink>
        </div>
    );
};

export default sidedrawer;
