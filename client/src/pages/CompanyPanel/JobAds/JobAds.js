import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Layout from "../../../components/Layout/Layout";
import classes from "./JobAds.module.css";

export class JobAds extends Component {
    state = {
        jobs: null,
    };

    async componentDidMount() {
        const res = await fetch("http://localhost:5000/jobs", {
            headers: {
                Authorization: this.props.token,
            },
        });

        if (res.status !== 200) {
            console.log(res);
            throw new Error("Could not fetch job ads");
        }

        const data = await res.json();

        this.setState({ jobs: data.jobs });
    }

    rowClickHandler = (job) => {
        this.props.history.push({ pathname: "/job-ads/" + job.id, job });
    };

    formatDate = (dateStr) => {
        const date = new Date(dateStr);
        let day = "" + date.getDate();
        let month = "" + (date.getMonth() + 1);
        let year = date.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [day, month, year].join(".");
    };

    render() {
        let jobs = <p>Loading...</p>;

        if (this.state.jobs) {
            const jobsCopy = this.state.jobs.map((job) => {
                return { ...job };
            });

            const headerName = [
                "User",
                "Boat Type",
                "Service",
                "Boat Location",
                "Date Created",
                "Due Date",
                "Job Type",
            ];
            const tableHeaders = headerName.map((head) => {
                return (
                    <TableCell
                        key={head}
                        align="center"
                        className={classes.TableHeader}
                    >
                        {head}
                    </TableCell>
                );
            });

            const jobAttributeNames = [
                "posterName",
                "boatTypeName",
                "serviceName",
                "boatCity",
                "createdAt",
                "due_date",
                "is_emergency",
            ];
            const tableContent = jobsCopy.map((job) => {
                let tableDisplayData = jobAttributeNames.map((attribute) => {
                    return job[attribute];
                });
                tableDisplayData[4] = this.formatDate(tableDisplayData[4]);
                tableDisplayData[5] = this.formatDate(tableDisplayData[5]);

                let tableDisplayFormat = tableDisplayData.map(
                    (attribute, index) => {
                        return (
                            <TableCell
                                key={job.id + "-" + index}
                                align="center"
                                className={classes.TableContent}
                            >
                                {attribute}
                            </TableCell>
                        );
                    }
                );

                tableDisplayFormat[6] = (
                    <TableCell key={job.id + "-6"} align="center">
                        <span className={classes.NoEmergency}>Normal</span>
                    </TableCell>
                );

                if (tableDisplayData[6] == true)
                    tableDisplayFormat[6] = (
                        <TableCell key={job.id + "-6"} align="center">
                            <span className={classes.Emergency}>Emergency</span>
                        </TableCell>
                    );
                console.log(this.props);

                // return <TableRow key={job.id}>{tableDisplayFormat}</TableRow>;
                return (
                    <TableRow
                        onClick={() => this.rowClickHandler(job)}
                        key={job.id}
                    >
                        {tableDisplayFormat}
                    </TableRow>
                );
            });
            jobs = (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>{tableHeaders}</TableRow>
                        </TableHead>
                        <TableBody>{tableContent}</TableBody>
                    </Table>
                </TableContainer>
            );
        }

        return (
            <Layout>
                <div>
                    <div className={classes.Title}>Job Ads</div>
                    {jobs}
                </div>
            </Layout>
        );
    }
}

export default withRouter(JobAds);
