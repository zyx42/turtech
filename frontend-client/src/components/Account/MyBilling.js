import React, {Component} from 'react';
import { getUserPaymentOptions } from "../../actions/userProfileActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Route, Switch } from "react-router-dom";
import AddNewPayment from "./AddNewPayment";
import {Button} from "react-bootstrap";

class MyBilling extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.setDefaultUserPaymentOption(this.state.userPaymentOptions.id);
    }

    componentDidMount() {
        this.props.getUserPaymentOptions();
    }

    ListOfPayments = () => {
        const { userPaymentOptions } = this.props;

        if (userPaymentOptions && userPaymentOptions.length > 0) {
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Default</th>
                                <th>Credit Card</th>
                                <th>Operations</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userPaymentOptions.map(userPaymentOption => (
                                <tr>
                                    <td>
                                        <input type="radio"
                                               name="defaultUserPaymentId"
                                               value={userPaymentOption.id}
                                               checked={userPaymentOption.defaultPaymentOption}/>
                                    </td>
                                    <td>
                                        {userPaymentOption.cardName}
                                    </td>
                                    <td>
                                        {
                                            // Buttons to implement "updateUserShipping" and "removeUserShipping" methods
                                        }
                                        <Button className="fa fa-pencil"
                                            //onClick={}
                                        >
                                        </Button>&nbsp;&nbsp;
                                        <Button className="fa fa-times"
                                            //onClick={}
                                        >
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button className="btn btn-primary"
                                type="submit">Save
                        </button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className="alert alert-info text-center">
                    No User Payment Options were specified yet.
                </div>
            )
        }
    }

    render() {

        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h4>Billing</h4>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/myAccount">
                                        List of Credit Cards</Link></li>
                                <li className="breadcrumb-item">
                                    <Link to="/myAccount/addNewPayment">
                                        Add(Update) Credit Card</Link></li>
                            </ol>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Switch>
                                <Route exact path="/myAccount"
                                       component={this.ListOfPayments} />

                                <Route exact path="/myAccount/addNewPayment"
                                       component={AddNewPayment} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MyBilling.propTypes = {
    userPaymentOptions: PropTypes.object.isRequired,
    getUserPaymentOptions: PropTypes.func.isRequired,
    setDefaultUserPaymentOption: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userPaymentOptions: state.userProfile.userPaymentOptions
});

export default connect(
    mapStateToProps,
    { getUserPaymentOptions }
)(MyBilling);