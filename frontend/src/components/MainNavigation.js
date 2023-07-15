import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNavigation.module.css";
// import logoImage from "./auth/images/logo.png";

function MainNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <nav className={`navbar navbar-expand-lg ${classes.header}`}>
      <div className={`container-fluid ${classes.containerFluid}`}>
        <div className={classes.brand}>
          <NavLink to="/">
            {/* <img
              src={logoImage}
              alt="logo"
              className="d-inline-block align-top"
              style={{ width: "7%", paddingTop: "0.8rem", marginRight: "-5px" }}
            /> */}
            Anonymity
          </NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${classes.navItemContainer}`}
          id={`navbarNav`}
        >
          <ul className={`navbar-nav ${classes.list}`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `nav-item ${classes.active}` : "nav-item"
                }
                end
              >
                Home
              </NavLink>
            </li>
            {!token && (
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? `nav-item ${classes.active}` : "nav-item"
                  }
                >
                  Register
                </NavLink>
              </li>
            )}
            {!token && (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? `nav-item ${classes.active}` : "nav-item"
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            {/* {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? `nav-item ${classes.active}` : "nav-item"
                }
              >
                Authentication
              </NavLink>
            </li>
          )} */}

            {token && (
              <li>
                <NavLink
                  to="/posts"
                  className={({ isActive }) =>
                    isActive ? `nav-item ${classes.active}` : "nav-item"
                  }
                >
                  Posts
                </NavLink>
              </li>
            )}

            {token && (
              <li>
                <Form action="/logout" method="post">
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--color-primary-400)",
                    }}
                  >
                    Logout
                  </button>
                </Form>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation;
