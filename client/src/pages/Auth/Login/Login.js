import React, { Component } from "react";

import Input from "../../../components/Input/Input";
import Auth from "../AuthWrap/Auth";
import classes from "./Login.module.css";

export class Login extends Component {
    state = {
        username: "",
        password: "",
    };

    inputChangeHandler = (fieldName, value) => {
        const copiedState = { ...this.state };
        copiedState[fieldName] = value;

        this.setState(copiedState);
    };

    render() {
        return (
            <Auth>
                <div className={classes.title}>Company Login</div>
                <form
                    onSubmit={(e) =>
                        this.props.onLogin(e, {
                            username: this.state.username,
                            password: this.state.password,
                        })
                    }
                >
                    <Input
                        label="username"
                        type="text"
                        required
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.inputChangeHandler}
                    />
                    <Input
                        label="password"
                        type="password"
                        required
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.inputChangeHandler}
                    />
                    <div className={classes.passwordHelpers}>
                        <span>
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">Remember me</label>
                        </span>
                        <p>Forgot password?</p>
                    </div>
                    <button className={classes.btn} type="submit">
                        Login
                    </button>
                </form>
            </Auth>
        );
    }
}

export default Login;
