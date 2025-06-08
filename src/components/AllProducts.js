import { Link } from "react-router-dom";
import slugify from "../utils/slugify";
import { useCart } from "../context/CartContext";

const AllProducts = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <div className="page-width justify-center">
      <div className="products-wrapper justify-center">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <div className="product-card">
                <div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="title-1">{product.title}</h3>
                  </Link>
                </div>
                <div>
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-180 w-full"
                    />
                  </Link>
                </div>
                <div className="product-category-wrapper">
                  {product.category.slice(0, 4).map((cat, index) => (
                    <div key={index}>
                      <Link
                        to={`/category/${slugify(cat)}`}
                        className="product-category-link"
                      >
                        {cat}
                      </Link>
                    </div>
                  ))}
                </div>

                <div>
                  {product.description
                    .split(";")
                    .slice(0, 4)
                    .map((line, index) => (
                      <p key={index} className="description-1">
                        {line.trim()}
                      </p>
                    ))}
                </div>
                <div>
                  <p className="price">${product.price}</p>
                </div>
                <div>
                  <button
                    onClick={() => addToCart(product)}
                    className="add-to-cart-button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
