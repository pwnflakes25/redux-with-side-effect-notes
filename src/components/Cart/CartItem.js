import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const { title, quantity, totalPrice, price, id } = props.item;
  const dispatchFn = useDispatch();

  const onAddItemHandler = () => {
    dispatchFn(cartActions.addItem({...props.item}));
  }

  const onRemoveItemHandler = () => {
    dispatchFn(cartActions.removeItem(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice?.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onRemoveItemHandler}>-</button>
          <button onClick={onAddItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
