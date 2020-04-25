import React, {Component} from 'react';
import Pagination from "react-js-pagination";
import {getReviews} from "../../actions/reviewActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import UserReview from "./UserReview";
import Product from "./Product";

class UserReviews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 0,
            totalPages: 0,
            itemsCountPerPage: 10,
            totalElements: 0
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.props.getProducts(this.state.activePage);
        this.setState({totalPages: this.props.totalPages});
        this.setState({totalElements: this.props.totalElements});
        this.setState({itemsCountPerPage: this.props.itemsCountPerPage});
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        this.props.getProducts(pageNumber);
    }

    render() {
        const { reviews } = this.props.reviews;

        let ReviewsDisplay;
        let PaginationDisplay;

        const paginationAlgorithm = () => {
            if (this.state.totalPages > 1) {
                return(
                    <Pagination activePage = {this.state.activePage}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.state.totalElements}
                                pageRangeDisplayed={5}
                                itemClass="page-item"
                                linkClass="page-link"
                                onChange={this.handlePageChange.bind(this)} />
                );
            }
        };

        const contentAlgorithm = reviews => {
            if (this.state.totalElements < 1) {
                return(
                    <div className="alert alert-info">
                        Oops, no reviews are present yet. Maybe you should leave the first one?
                    </div>
                );
            } else {
                return(
                        <div>
                            {reviews.map(review => (
                                <UserReview key = {review.id} review = {review} />
                            ))}
                        </div>
                );
            }
        };

        ReviewsDisplay = contentAlgorithm(reviews);
        PaginationDisplay = paginationAlgorithm();

        return (
            <div>
                <div className="col-12" id="reviews">
                    <div className="card border-light mb-3">
                        <div className="card-header bg-primary text-white text-uppercase">
                            <i className="fa fa-comment" /> Reviews
                        </div>
                        <div className="card-body">
                            { ReviewsDisplay }
                        </div>

                        <!-- Reviews Pagination -->
                        <div className="col-12">
                            { PaginationDisplay }
                        </div>

                        <!-- Leave a review -->
                        <div className="card">
                            <div className="card-body">
                                {
                                    //TODO implement "leave review" action
                                }
                                <form>
                                    <div className="form-group">
                                        <label>Your Review</label>
                                        <textarea className="form-control"
                                                  id="text"
                                                  name="text"
                                                  rows="6"
                                                  required="required" />
                                    </div>
                                    <div className="mx-auto">
                                        <button type="submit"
                                                className="btn btn-primary text-right">Leave the review</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserReviews.propTypes = {
    reviews: PropTypes.object.isRequired,
    getReviews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    reviews: state.reviews,
    totalElements: state.totalElements,
    totalPages: state.totalPages,
    itemsCountPerPage: state.itemsCountPerPage
});

export default connect(
    mapStateToProps,
    { getReviews }
)(UserReviews);