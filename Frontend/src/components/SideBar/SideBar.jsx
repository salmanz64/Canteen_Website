import React, { useState, useRef, useEffect, useContext } from "react";
import "./SideBar.css";
import logo from './logo.png'
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const SideBar = () => {

  const {setToken} = useContext(StoreContext)
  const logOut=()=>{
    setToken("")
    localStorage.removeItem("Token")
  }

  const collapsedSidebarHeight = "56px"; // Height in mobile view (collapsed)
  const fullSidebarHeight = "calc(100vh - 32px)"; // Height in larger screen

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const sidebarRef = useRef(null);
  const menuIconRef = useRef(null);

  const updateSidebarHeight = (isActive) => {
    if (sidebarRef.current) {
      sidebarRef.current.style.height = isActive
        ? `${sidebarRef.current.scrollHeight}px`
        : collapsedSidebarHeight;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        sidebarRef.current.style.height = fullSidebarHeight;
      } else {
        setIsCollapsed(false);
        sidebarRef.current.style.height = "auto";
        updateSidebarHeight(isMenuActive);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize height on mount

    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuActive]);

  useEffect(() => {
    updateSidebarHeight(isMenuActive);
    if (menuIconRef.current) {
      menuIconRef.current.innerText = isMenuActive ? "close" : "menu";
    }
  }, [isMenuActive]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isMenuActive ? "menu-active" : ""}`}
    >
      {/* Sidebar Header */}
      <header className="sidebar-header">
        <a href="#" className="header-logo">
          <img src={logo} />
        </a>
        <button className="toggler sidebar-toggler" onClick={() => setIsCollapsed((prev) => !prev)}>
          <span className="material-symbols-rounded">chevron_left</span>
        </button>
        <button className="toggler menu-toggler" onClick={() => setIsMenuActive((prev) => !prev)}>
          <span ref={menuIconRef} className="material-symbols-rounded">menu</span>
        </button>
      </header>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav-list primary-nav">
          {[
            { icon: "Home", label: "Home" ,"route": '/' },
            { icon: "Shopping_Cart", label: "Cart","route": '/cart' },
            { icon: "account_balance_wallet", label: "Checkout","route": '/checkout' },
            { icon: "orders", label: "Order Tracking","route": '/orders-track' },
           
            
            
            
            
            
            
          ].map(({ icon, label,route }) => (
           <Link to={route}> <li className="nav-item" key={label}>
              <a href="#" className="nav-link">
                <span className="nav-icon material-symbols-rounded">{icon}</span>
                <span className="nav-label">{label}</span>
              </a>
              <span className="nav-tooltip">{label}</span>
            </li>
            </Link>
          ))}
        </ul>

        {/* Secondary Navigation */}
        <ul className="nav-list secondary-nav">
         
          <Link to='/profile'><li className="nav-item" >
              <a href="#" className="nav-link">
                <span className="nav-icon material-symbols-rounded">account_circle</span>
                <span className="nav-label">Profile</span>
              </a>
              <span className="nav-tooltip">Profile</span>
            </li>
            </Link>
          <li className="nav-item" onClick={()=>logOut()}>
              <a href="#" className="nav-link" >
                <span className="nav-icon material-symbols-rounded">logout</span>
                <span className="nav-label">Logout</span>
              </a>
              <span className="nav-tooltip">Logout</span>
            </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
