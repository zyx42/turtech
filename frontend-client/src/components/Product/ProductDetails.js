import React, {Component, useState} from "react";
import {Link} from "react-router-dom";
import {getProduct} from "../../actions/productActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addToCart} from "../../actions/shoppingCartActions";
import {Button, Modal} from "react-bootstrap";
import UserReviews from "../UserReview/UserReviews";

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addedToCart: false,
            errors: {}
        };
    }

    componentDidMount() {
        const { productId } = this.props.match.params;
        this.props.getProduct(productId, this.props.history);
    }

    onAddToCartClick = productId => {
        this.props.addToCart(productId, 1);
        //TODO if response is "success" then change "addedToCart" to true;
    };

    render() {
        const { product } = this.props;
        const { errors } = this.state;

        function ProductAvailability(props) {
            if (product.inStockNumber >= 10) {
                return <div className="alert alert-success">In Stock</div>;
            } else if (product.inStockNumber < 10 && product.inStockNumber > 0) {
                return <div className="alert alert-warning">Only {product.inStockNumber} In Stock</div>;
            } else if (product.inStockNumber === 0) {
                return <div className="alert alert-danger">Unavailable</div>;
            } else {
                return null;
            }
        }

        function PictureWithZoom() {
            const [ show,setShow ] = useState(false);
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);

            return (
                <>
                    <div className="text-center">
                        <img className="img-fluid"
                             alt="product thumbnail"
                             src="https://dummyimage.com/800x800/55595c/fff" />
                        <button className="btn btn-link"
                                onClick={handleShow}>Zoom</button>
                    </div>
                    <Modal size="lg"
                           show={show}
                           onHide={handleClose}
                           centered>
                        <Modal.Header closeButton>
                            <Modal.Title><h5>{product.name}</h5></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="img-fluid"
                                 alt="zoomed product"
                                 src="https://dummyimage.com/1200x1200/55595c/fff" />
                        </Modal.Body>
                    </Modal>
                </>
            )
        }

        function onPlusClick() {
            if (document.getElementById("qty").value < product.inStockNumber) {
                document.getElementById("qty").value++;
            }
        }

        function onMinusClick() {
            if (document.getElementById("qty").value > 1) {
                document.getElementById("qty").value--;
            }
        }

        function NotEnoughStock(errors) {
            if (errors.notEnoughStock) {
                return <div id="notEnoughStock"
                            className="alert alert-danger">
                    Sorry, but we don't have enough items in stock to fulfill such an order</div>
            } else {
                return null;
            }
        }

        // TODO return element only after item was added to cart
        function AddedToCart() {
            if (false) {
                return <div id="addSuccess"
                            className="alert alert-success">Added to cart</div>;
            } else {
                return null;
            }
        }

        return (
            <div>
                {
                    // Page Content
                }
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading">TURTECH PRODUCT</h1>
                        <p className="lead text-muted mb-0">Don't get overwhelmed with the awe ;)</p>
                    </div>
                </section>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/welcome">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        {product.name}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {
                            // Image
                        }
                        <div className="col-12 col-lg-6">
                            <div className="card bg-light mb-3">
                                <div className="card-body">
                                    <PictureWithZoom />
                                </div>
                            </div>
                        </div>

                        {
                            // Add to cart
                        }
                        <div className="col-12 col-lg-6 add_to_cart_block">
                            <div className="card bg-light mb-3">
                                <div className="card-body">
                                    <div className="col-xs-6 float-right">
                                        <ProductAvailability />
                                    </div>
                                    <h4>
                                        Our Price:&nbsp;
                                        <span style={{color: '#db3208'}}>
                                            ${(product.ourPrice + 0).toFixed(2)}
                                        </span>
                                    </h4>
                                    <p>
                                        List Price:&nbsp;
                                        <span style={{textDecoration: 'line-through'}}>
                                            ${(product.listPrice + 0).toFixed(2)}</span>&nbsp;
                                        <span>| You save:
                                            ${(product.listPrice - product.ourPrice).toFixed(2)}</span>
                                    </p>
                                    <div className="col-xs-5">
                                        <p>
                                            <strong>Manufacturer: </strong>
                                            {product.manufacturer}
                                        </p>
                                        <p>
                                            <strong>Manufacture Date: </strong>
                                            {product.manufactureDate}
                                        </p>
                                        <p>
                                            <strong>Category: </strong>
                                            {product.category}
                                        </p>
                                        <p>
                                            <strong>Condition: </strong>
                                            {product.condition}
                                        </p>
                                        <p>
                                            <strong>Shipping Weight: </strong>
                                            {product.shippingWeight} kg
                                        </p>
                                    </div>
                                    <div>
                                        {
                                            // Not enough stock error
                                        }
                                        <NotEnoughStock />
                                        {
                                            // Added to cart notification
                                        }
                                        <AddedToCart />

                                        <label>Quantity :</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <button type="button"
                                                        className="quantity-left-minus btn btn-danger btn-number"
                                                        onClick={onMinusClick}>
                                                    <i className="fa fa-minus" />
                                                </button>
                                            </div>
                                            <input type="text"
                                                   className="form-control"
                                                   id="qty"
                                                   name="qty"
                                                   min="1"
                                                   max="100"
                                                   value="1" />
                                            <div className="input-group-append">
                                                <button type="button"
                                                        className="quantity-right-plus btn btn-success btn-number"
                                                        onClick={onPlusClick}>
                                                    <i className="fa fa-plus" />
                                                </button>
                                            </div>
                                        </div>
                                        <button className="btn btn-success btn-lg btn-block text-uppercase"
                                                onClick={this.onAddToCartClick.bind(this, product.id)}>
                                            <i className="fa fa-shopping-cart" /> Add To Cart
                                        </button>
                                        <div className="product_reassurance">
                                            <ul className="list-inline">
                                                <li className="list-inline-item">
                                                    <i className="fa fa-truck fa-2x" />
                                                    <br />Fast delivery</li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-credit-card fa-2x" />
                                                    <br />Secure payment</li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-phone fa-2x" />
                                                    <br />+399 99 999</li>
                                            </ul>
                                        </div>
                                        <div className="reviews_product p-3 mb-2 ">
                                            {
                                                // TODO {userReviews.size} to show the number of reviews
                                            }
                                            0 reviews&nbsp;
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" /> (4/5)
                                            <Link className="pull-right"
                                                  to="#reviews">View all reviews</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {
                            // Description
                        }
                        <div className="col-12">
                            <div className="card border-light mb-3">
                                <div className="card-header bg-primary text-white text-uppercase">
                                    <i className="fa fa-align-justify" /> Description & Specifications
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{product.specifications}</p>
                                    <p className="card-text">{product.description}</p>
                                </div>
                            </div>
                        </div>

                        {
                            // User reviews
                        }
                        <UserReviews productId={product.id} />

                    </div>
                </div>

            </div>
        );
    }
}

ProductDetails.propTypes = {
    getProduct: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    product: state.products.product
});

export default connect(
    mapStateToProps,
    { getProduct, addToCart }
)(ProductDetails);