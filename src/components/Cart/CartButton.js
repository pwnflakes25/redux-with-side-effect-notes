// import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { uiSliceAction } from "../../store/ui-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatchFn = useDispatch();

  const onCartClickHandler = () => {
    dispatchFn(uiSliceAction.toggleCartView());
  };

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <button onClick={onCartClickHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
