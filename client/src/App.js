import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Auth/Login/Login";
import Dasboard from "./pages/CompanyPanel/Dashboard/Dashboard";
import JobAds from "./pages/CompanyPanel/JobAds/JobAds";
import JobAd from "./pages/CompanyPanel/JobAds/JobAd/JobAd";
import Proposals from "./pages/CompanyPanel/Proposals/Proposals";
import Reviews from "./pages/CompanyPanel/Reviews/Reviews";
import "./App.css";

class App extends Component {
    state = {
        isAuth: false,
        userId: null,
        userRole: null,
        token: null,
    };

    componentDidMount() {
        const token = localStorage.getItem("token");
        const expiryDate = localStorage.getItem("expiryDate");
        if (!token || !expiryDate) {
            return;
        }
        if (new Date(expiryDate) <= new Date()) {
            this.logoutHandler();
            return;
        }
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("userRole");
        const remainingMilliseconds =
            new Date(expiryDate).getTime() - new Date().getTime();
        this.setState({
            isAuth: true,
            token: token,
            userId: userId,
            userRole: userRole,
        });
        this.setAutoLogout(remainingMilliseconds);
    }

    logoutHandler = () => {
        this.setState({ isAuth: false, token: null, userRole: null });
        localStorage.removeItem("token");
        localStorage.removeItem("expiryDate");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
    };

    setAutoLogout = (milliseconds) => {
        setTimeout(() => {
            this.logoutHandler();
        }, milliseconds);
    };

    loginHandler = async (event, authData) => {
        event.preventDefault();
        try {
            const loginResult = await fetch(
                "http://localhost:5000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: authData.username,
                        password: authData.password,
                    }),
                }
            );

            if (loginResult.status === 422) {
                throw new Error("Validation failed.");
            }
            if (loginResult.status !== 200 && loginResult.status !== 201) {
                console.log("Error!");
                throw new Error("Could not authenticate you!");
            }

            const jsonData = await loginResult.json();

            if (jsonData.userRole !== "company") {
                throw new Error("You are not authorized to login here");
            }

            console.log(jsonData);
            this.setState({
                isAuth: true,
                token: jsonData.token,
                authLoading: false,
                userId: jsonData.userId,
                userRole: jsonData.userRole,
            });

            localStorage.setItem("token", jsonData.token);
            localStorage.setItem("userId", jsonData.userId);
            localStorage.setItem("userRole", jsonData.userRole);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem("expiryDate", expiryDate.toISOString());
            this.setAutoLogout(remainingMilliseconds);
        } catch (err) {
            console.log(err);
            this.setState({
                isAuth: false,
            });
        }
    };

    render() {
        let routes = (
            <Switch>
                <Route
                    path="/"
                    exact
                    render={(props) => (
                        <Login {...props} onLogin={this.loginHandler} />
                    )}
                />

                <Redirect to="/" />
            </Switch>
        );
        if (this.state.isAuth) {
            routes = (
                <Switch>
                    <Route path="/" exact render={(props) => <Dasboard />} />
                    <Route
                        path="/job-ads"
                        exact
                        render={(props) => <JobAds token={this.state.token} />}
                    />
                    <Route path="/job-ads/:id" render={(props) => <JobAd />} />
                    <Route
                        path="/proposals"
                        exact
                        render={(props) => <Proposals />}
                    />
                    <Route
                        path="/reviews"
                        exact
                        render={(props) => <Reviews />}
                    />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return routes;
    }
}

export default App;
