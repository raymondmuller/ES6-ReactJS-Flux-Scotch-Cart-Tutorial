var React = require('react');
var CartStore = require('../stores/CartStore');
var ProductStore = require('../stores/ProductStore');
var FluxProduct = require('./FluxProduct.react');
var FluxCart = require('./FluxCart.react');

// Method to retrieve state from Stores

function getCartState() {
	return {
		product: ProductStore.getProduct(),
	    selectedProduct: ProductStore.getSelected(),
	    cartItems: CartStore.getCartItems(),
	    cartCount: CartStore.getCartCount(),
	    cartTotal: CartStore.getCartTotal(),
	    cartVisible: CartStore.getCartVisible()
	};
}

class FluxCartApp extends React.Component {

	// Get initial state from stores
	constructor(props) {
		super(props);
		this.state = getCartState();
	}

	// Add change listeners to stores
	componentDidMount() {
		ProductStore.addChangeListener(this._onChange.bind(this));
		CartStore.addChangeListener(this._onChange.bind(this));
	}

	// Render our child components, passing state via props
	render() {
		return(
		 	<div className="flux-cart-app">
		        <FluxCart products={this.state.cartItems} count={this.state.cartCount} total={this.state.cartTotal} visible={this.state.cartVisible} />
		        <FluxProduct product={this.state.product} cartitems={this.state.cartItems} selected={this.state.selectedProduct} />
      		</div>
		);
	}

	_onChange() {
		this.setState(getCartState());
	}
};

module.exports = FluxCartApp

