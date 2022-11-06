import { cartActions } from "./cart-slice";
import { uiSliceAction } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiSliceAction.showNotification({
        status: "loading",
        title: "Fetching Cart Data",
        message: "We are fetching your cart data..",
      })
    );

    const fetchData = async () => {
      const response = await fetch(
        "https://movie-app-bbbc0-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      return await response.json();
    };

    try {
      const cartData = await fetchData();
      console.log("the cart data fetched is:", cartData);
      dispatch(
        cartActions.replaceCart({
          ...cartData,
          items: cartData.items || [],
        })
      );
    } catch (error) {
      dispatch(
        uiSliceAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    } finally {
      setTimeout(() => {
        dispatch(uiSliceAction.showNotification(null));
      }, 1000);
    }
  };
};

// Using thunk action creator ourselves
// for using side effect before we call reducer
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // show notification for loading
    dispatch(
      uiSliceAction.showNotification({
        status: "loading",
        title: "Posting",
        message: "Submitting item to cart...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://movie-app-bbbc0-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity
        }) }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiSliceAction.showNotification({
          status: "success",
          title: "Submitted Successfully!",
          message: "Item Successfully Added to Cart!",
        })
      );
    } catch (error) {
      dispatch(
        uiSliceAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    } finally {
      setTimeout(() => {
        dispatch(uiSliceAction.showNotification(null));
      }, 1000);
    }
  };
};
