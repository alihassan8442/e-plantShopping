import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // cart items stored globally
  },

  reducers: {
    // ------------------------ ADD ITEM ------------------------
    addItem: (state, action) => {
      console.log("⛳ addItem reducer CALLED with payload:", action.payload);

      const newItem = action.payload; // plant details

      // Check if item already exists
      const existingItem = state.items.find(
        (item) => item.name === newItem.name
      );

      if (existingItem) {
        console.log(`Item already exists, increasing quantity for: ${newItem.name}`);
        existingItem.quantity += 1;
      } else {
        console.log(`Adding NEW item to cart: ${newItem.name}`);
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }

      console.log("Updated cart items:", JSON.parse(JSON.stringify(state.items)));
    },

    // ------------------------ REMOVE ITEM ------------------------
    removeItem: (state, action) => {
      const itemName = action.payload;

      console.log(`removeItem reducer CALLED for item: ${itemName}`);

      state.items = state.items.filter((item) => item.name !== itemName);

      console.log("Updated cart after removal:", JSON.parse(JSON.stringify(state.items)));
    },

    // ------------------------ UPDATE QUANTITY ------------------------
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      console.log(
        `updateQuantity reducer CALLED for item: ${name}, new amount: ${amount}`
      );

      const targetedItem = state.items.find((item) => item.name === name);

      if (targetedItem) {
        console.log(`Updating quantity of ${name} to: ${amount}`);
        targetedItem.quantity = amount;
      } else {
        console.log(`Item ${name} not found in cart.`);
      }

      console.log("Updated cart after quantity change:", JSON.parse(JSON.stringify(state.items)));
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
