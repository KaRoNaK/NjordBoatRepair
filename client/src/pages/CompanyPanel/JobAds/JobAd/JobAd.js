import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Layout from "../../../../components/Layout/Layout";
import classes from "./JobAd.module.css";

export class JobAd extends Component {
    state = {
        data: this.props.location.job,
    };

    render() {
        let content = <p>Not available</p>;

        if (this.state.data) {
            const fieldNames = [
                { boatName: "Boat Name" },
                { boatTypeName: "Boat Type" },
                { boatAddress: "Boat Location" },
                { due_date: "Due Date" },
                { due_time: "Due Time" },
                { is_emergency: "Job Type" },
                { boatTypeName: "Job Category" },
                { boatSubTypeName: "Job Sub Category" },
                { description: "Job Description" },
            ];

            const fieldValues = fieldNames.map((fname) =>
                Object.keys(fname).map((key) => this.state.data[key])
            );

            fieldValues[2] =
                this.state.data.boatAddress + ", " + this.state.data.boatCity;

            fieldValues[3] = new Date(
                this.state.data.due_date
            ).toLocaleDateString();

            fieldValues[5] = this.state.data.is_emergency
                ? "Emergency"
                : "Normal";

            const rows = fieldNames.map((fname, index) =>
                Object.keys(fname).map((key) => {
                    return (
                        <TableRow key={key}>
                            <TableCell className={classes.FieldName}>
                                {fname[key]}
                            </TableCell>
                            <TableCell className={classes.FieldValue}>
                                {fieldValues[index]}
                            </TableCell>
                        </TableRow>
                    );
                })
            );

            const details = (
                <Table>
                    <TableBody>{rows}</TableBody>
                </Table>
            );

            content = (
                <>
                    <div className={classes.Title}>Job Description</div>
                    <div className={classes.Container}>
                        <div className={classes.Details}>{details}</div>
                        <div className={classes.Media}>
                            Images/Video placeholder
                        </div>
                        <div className={classes.ReportContainer}>
                            <button
                                className={
                                    classes.Button + " " + classes.ReportButton
                                }
                            >
                                Report User
                            </button>
                        </div>
                        <div className={classes.ResponseContainer}>
                            <button
                                className={
                                    classes.Button +
                                    " " +
                                    classes.ProposalButton
                                }
                            >
                                Make a proposal
                            </button>
                            <button
                                className={
                                    classes.Button + " " + classes.RejectButton
                                }
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </>
            );
        }

        return <Layout>{content}</Layout>;
    }
}

export default withRouter(JobAd);
