import React, { useState, useEffect, useContext } from "react";
import "./SideBar.css";
import logo from './logo.png';
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const SideBar = () => {
  const { setToken } = useContext(StoreContext);

  const logOut = () => {
    setToken("");
    localStorage.removeItem("Token");
  };

  // Collapse state: true means collapsed (icons only), false means expanded (icons + labels)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mobile menu open/close
  const [isMenuActive, setIsMenuActive] = useState(false);

  // Detect large screen for responsiveness
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      if (large) {
        setIsMenuActive(false); // close mobile menu if switching to large screen
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={`sidebar ${isLargeScreen ? "" : "sidebar-top"} ${isCollapsed && isLargeScreen ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <Link to="/" className="header-logo " >
            <img src={logo} alt="Logo" />
          </Link>

          {/* Mobile menu toggler */}
          {!isLargeScreen && (
            <button
              className="toggler menu-toggler"
              onClick={() => setIsMenuActive((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-rounded">
                {isMenuActive ? "close" : "menu"}
              </span>
            </button>
          )}

          {/* Desktop sidebar collapse toggle */}
          {isLargeScreen && (
            <button
              className="toggler sidebar-toggler"
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <span className="material-symbols-rounded">
                {isCollapsed ? "chevron_right" : "chevron_left"}
              </span>
            </button>
          )}
        </div>

        {/* Navigation menu */}
        {(isLargeScreen || isMenuActive) && (
          <nav className="sidebar-nav">
            <ul className="nav-list primary-nav">
              {[
                { icon: "home", label: "Home", route: "/" },
                { icon: "shopping_cart", label: "Cart", route: "/cart" },
                { icon: "account_balance_wallet", label: "Checkout", route: "/checkout" },
                { icon: "local_shipping", label: "Order Tracking", route: "/orders-track" },
              ].map(({ icon, label, route }) => (
                <Link to={route} key={label}>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <span className="nav-icon material-symbols-rounded">{icon}</span>
                      {(!isCollapsed || !isLargeScreen) && <span className="nav-label">{label}</span>}
                    </a>
                    {isCollapsed && <span className="nav-tooltip">{label}</span>}
                  </li>
                </Link>
              ))}
            </ul>

            <ul className="nav-list secondary-nav">
              <Link to="/profile" key="profile">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <span className="nav-icon material-symbols-rounded">account_circle</span>
                    {(!isCollapsed || !isLargeScreen)  && <span className="nav-label">Profile</span>}
                  </a>
                  {isCollapsed && <span className="nav-tooltip">Profile</span>}
                </li>
              </Link>
              <li className="nav-item" onClick={logOut}>
                <a href="#" className="nav-link">
                  <span className="nav-icon material-symbols-rounded">logout</span>
                  {(!isCollapsed || !isLargeScreen)  && <span className="nav-label">Logout</span>}
                </a>
                {isCollapsed && <span className="nav-tooltip">Logout</span>}
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default SideBar;
