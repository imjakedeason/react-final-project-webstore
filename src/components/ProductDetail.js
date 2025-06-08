import { useParams, useNavigate, Link } from "react-router-dom";
import slugify from "../utils/slugify";
import { useCart } from "../context/CartContext";
import { FaAnglesLeft } from "react-icons/fa6";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <div className="page-width">
        <div className="back">
          <button onClick={() => navigate(-1)}>
            <FaAnglesLeft style={{ marginRight: "8px" }} />
            Back
          </button>
        </div>
        <div className="product-page">
          <div>
            <p className="font-bold">
              {product.category
                .map((cat) => (
                  <Link to={`/category/${slugify(cat)}`} key={cat}>
                    {cat}
                  </Link>
                ))
                .reduce((prev, curr) => [prev, ", ", curr])}
            </p>
          </div>
          <h3 className="title-2">{product.title}</h3>
          <img
            className="h-400 w-full"
            src={product.image}
            alt={product.title}
          />
          <div>
            {product.description.split(";").map((line, index) => (
              <p className="description-2" key={index}>
                {line.trim()}
              </p>
            ))}
          </div>
          <div>
            <p className="price2">${product.price}</p>
          </div>

          <button onClick={() => addToCart(product)} className="add2cart">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
