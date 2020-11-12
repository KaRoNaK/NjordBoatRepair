import React from "react";

import classes from "./Input.module.css";

const input = (props) => (
    <div>
        <input
            className={classes.input}
            type={props.type}
            id={props.label}
            required={props.required}
            value={props.value}
            placeholder={props.placeholder}
            onChange={(e) => props.onChange(props.label, e.target.value)}
        />
    </div>
);

export default input;
