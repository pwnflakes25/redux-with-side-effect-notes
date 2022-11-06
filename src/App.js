import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import { uiSliceAction } from "./store/ui-slice";

let isInitial = true;

function App() {
  const isCartVisible = useSelector((state) => state.ui.cartVisible);

  const cart = useSelector((state) => state.cart);
  const dispatchFn = useDispatch();
  const notification = useSelector((state) => state.ui.notification);


  useEffect(() => {
    dispatchFn(fetchCartData());
  }, [dispatchFn])

  // using useEffect to call action creator
  // to use side effect while also using reducer
  // as using async is not allowed in redux reducer
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatchFn(sendCartData(cart));
    }
  }, [cart, dispatchFn])



  // ========== BELOW ARE ALTERNATIVE TO THUNK===
  // useEffect(() => {

  //   // As async is not allowed in reducer
  //   // we can use useEffect when there is a change
  //   // in the subscription of the cart item
  //   // and call the post method
  //   // generally work for optimistic approach
  //   // an alternative to using action creator/thunk
  //   const updateCart = async () => {
  //     // dispatchFn(
  //     //   uiSliceAction.showNotification({
  //     //     status: "loading",
  //     //     title: "Posting",
  //     //     message: "Submitting item to cart...",
  //     //   })
  //     // );
  //     // const response = await fetch(
  //     //   "https://movie-app-bbbc0-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
  //     //   { method: "PUT", body: JSON.stringify(cart) }
  //     // );

  //     // if (!response.ok) {
  //     //   throw new Error("Sending cart data failed.");
  //     // }

  //     // dispatchFn(
  //     //   uiSliceAction.showNotification({
  //     //     status: "success",
  //     //     title: "Submitted Successfully!",
  //     //     message: "Item Successfully Added to Cart!",
  //     //   })
  //     // );

  //     // setTimeout(() => {
  //     //   dispatchFn(uiSliceAction.showNotification(null));
  //     // }, 2000);
  //   };

  //   // if (isInitial) {
  //   //   isInitial = false;
  //   //   return;
  //   // }

  //   // updateCart().catch((error) => {
  //   //   dispatchFn(
  //   //     uiSliceAction.showNotification({
  //   //       status: "error",
  //   //       title: "Error!",
  //   //       message: "Sending cart data failed!",
  //   //     })
  //   //   );

  //   //   setTimeout(() => {
  //   //     dispatchFn(uiSliceAction.showNotification(null));
  //   //   }, 2000);
  //   // });
  // }, [cart, dispatchFn]);


  return (
    <Fragment>
      {notification && <Notification {...notification} />}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
