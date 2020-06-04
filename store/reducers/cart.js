import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartITem;

      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        updatedOrNewCartITem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
        );
        return {
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartITem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        updatedOrNewCartITem = new CartItem(1, prodPrice, prodTitle, prodPrice);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartITem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }

    default:
      return state;
  }
};
