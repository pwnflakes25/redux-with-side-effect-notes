import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 8.99,
    title: "My First Book",
    description: "The First Book I ever wrote",
  },
  {
    id: "p2",
    price: 9.15,
    title: "My Second Book",
    description: "The First Book I ever wrote",
  },
  {
    id: "p3",
    price: 10.99,
    title: "Dungeon and Dragon: The Wild Conquest",
    description: "Follows Aegon on his conquest",
  },
];

const products = DUMMY_PRODUCTS.map((product) => <ProductItem key={product.id} {...product} />);

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{products}</ul>
    </section>
  );
};

export default Products;
