import { Link, NavLink } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import slugify from "../utils/slugify";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";

const Navigation = () => {
  const { categories } = useCategories();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const { totalItems } = useCart();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // 200ms delay prije nego se ugasi
  };

  return (
    <div className="nav-wrapper">
      <div className="nav">
        <div className="nav-left">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <div
            ref={dropdownRef}
            className="dropdown-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink to="/category" className="nav-link">
              <span className="nav-cat">
                <FaCaretDown /> Categories
              </span>
            </NavLink>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-content">
                  {categories.map((cat) => (
                    <div key={cat.title} className="category-group">
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
              </div>
            )}
          </div>
        </div>
        <div className="nav-right">
          <nav>
            <NavLink to="/cart" className="cart-link">
              <FaCartShopping size={24} />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
