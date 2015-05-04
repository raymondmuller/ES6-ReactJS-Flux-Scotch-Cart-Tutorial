var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxCartConstants = require('../constants/FluxCartConstants');

// Define actions object
var FluxCartActions = {

	receiveProduct(data) {
		AppDispatcher.handleAction({
			actionType: FluxCartConstants.RECEIVE_DATA,
			data: data
		})
	},
	
	// Set currentlys elected product variation
	selectProduct(index) {
		AppDispatcher.handleAction({
			actionType: FluxCartConstants.SELECT_PRODUCT,
			data: index
		})
	},

	// Add item to cart
	addToCart(sku, update) {
		AppDispatcher.handleAction({
			actionType: FluxCartConstants.CART_ADD,
			sku: sku,
			update: update
		})
	},

	// Remove item from cart
	removeFromCart(sku) {
		AppDispatcher.handleAction({
			actionType: FluxCartConstants.CART_REMOVE,
			sku: sku
		})
	},

	updateCartVisible(cartVisible) {
		AppDispatcher.handleAction({
			actionType: FluxCartConstants.CART_VISIBLE,
			cartVisible: cartVisible
		})
	}
};

module.exports = FluxCartActions;