import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // --------------------------------------------------------
  // Calculate the total cost of ALL items in the cart
  // --------------------------------------------------------
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach(item => {
      const price = parseFloat(item.cost.substring(1)); // "$20" → 20
      total += price * item.quantity;
    });

    return total.toFixed(2);
  };

  // --------------------------------------------------------
  // Continue shopping → call parent function
  // --------------------------------------------------------
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // --------------------------------------------------------
  // Increment quantity
  // --------------------------------------------------------
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ 
      name: item.name, 
      amount: item.quantity + 1 
    }));
  };

  // --------------------------------------------------------
  // Decrement quantity
  // --------------------------------------------------------
  const handleDecrement = (item) => {

    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        amount: item.quantity - 1
      }));
    } else {
      // If quantity goes to 0 → remove the item
      dispatch(removeItem(item.name));
    }
  };

  // --------------------------------------------------------
  // Remove item completely
  // --------------------------------------------------------
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // --------------------------------------------------------
  // Calculate subtotal for ONE item
  // --------------------------------------------------------
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">{item.quantity}</span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>

        <br />

        <button className="get-started-button1">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;

