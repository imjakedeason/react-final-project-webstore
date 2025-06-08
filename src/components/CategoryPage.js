import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import slugify from "../utils/slugify";
import useCategories from "../hooks/useCategories";
import { useCart } from "../context/CartContext";
import Breadcrumbs from "./Breadcrumbs";
import { FaAnglesLeft } from "react-icons/fa6";

const CategoryPage = ({ products }) => {
  const { category } = useParams();
  const { categories } = useCategories();
  const { addToCart } = useCart();

  const navigate = useNavigate();

  if (!categories || categories.length === 0) {
    return <p>Loading categories...</p>;
  }

  if (!products || products.length === 0) {
    return <p>Loading products...</p>;
  }

  // Filter products to only those in the selected category
  const filtered = products.filter((product) =>
    product.category?.some((cat) => slugify(cat) === category)
  );

  return (
    <div className="page-width">
      <div className="back">
        <button onClick={() => navigate("/category")}>
          <FaAnglesLeft style={{ marginRight: "8px" }} />
          Categories
        </button>
        <Breadcrumbs />
      </div>
      {filtered.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <div className="page-width">
          <div className="products-wrapper">
            {filtered.map((product) => (
              <div key={product.id} className="product-card">
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
                <div>
                  <h4 className="product-category-wrapper">
                    {product.category
                      .slice(0, 4)
                      .map((cat, index) => (
                        <Link
                          to={`/category/${slugify(cat)}`}
                          key={cat}
                          className="product-category-wrapper"
                        >
                          {cat}
                        </Link>
                      ))
                      .reduce((prev, curr) => [prev, ", ", curr])}
                  </h4>
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
