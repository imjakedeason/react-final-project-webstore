import { Link, useLocation, useParams } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import slugify from "../utils/slugify";

const Breadcrumbs = () => {
  const location = useLocation();
  const { category } = useParams();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const { categories } = useCategories();

  let parentTitle = "";
  let categoryTitle = "";
  let parentSlug = "";
  let categorySlug = "";

  if (category && categories.length > 0) {
    for (const cat of categories) {
      const foundSub = cat.subcategories.find(
        (sub) => slugify(sub.slug) === category
      );
      if (foundSub) {
        parentTitle = cat.title;
        parentSlug = slugify(cat.slug);
        categoryTitle = foundSub.title;
        categorySlug = slugify(foundSub.slug);
        break;
      }
    }

    // fallback ako nema matcha
    if (!categoryTitle) {
      categoryTitle = category.replace(/-/g, " ");
      categorySlug = category;
    }
  }

  return (
    <nav className="breadcrumbs font-bold">
      {parentTitle && (
        <>
          <Link to={`/category/${parentSlug}`}>{parentTitle}</Link>
          <span>/</span>
        </>
      )}

      {categoryTitle && (
        <>
          <Link to={`/category/${categorySlug}`}>{categoryTitle}</Link>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
