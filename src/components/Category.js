import { Link } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import slugify from "../utils/slugify";

const Category = () => {
  const { categories } = useCategories();

  return (
    <div className="page-width flex justify-center">
      {categories.map((cat) => (
        <div key={cat.title} className="categories">
          <h4>
            <Link
              to={`/category/${slugify(cat.title)}`}
              className="category-link"
            >
              {cat.title}
            </Link>
          </h4>
          <ul className="subcategory-list">
            {cat.subcategories.map((sub) => (
              <li key={sub.slug} className="subcategory-item">
                <Link
                  to={`/category/${slugify(sub.slug)}`}
                  className="subcategory-link"
                >
                  {sub.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Category;
