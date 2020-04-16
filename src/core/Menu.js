import React, { Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#ff9900",
    };
  } else {
    return {
      color: "white",
    };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nab-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" to="/" style={isActive(history, "/")}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/shop"
          style={isActive(history, "/shop")}
        >
          Shop
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/user/dashboard"
            style={isActive(history, "/user/dashboard")}
          >
            User Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/admin/dashboard"
            style={isActive(history, "/admin/dashboard")}
          >
            Admin Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signup"
              style={isActive(history, "/signup")}
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signin"
              style={isActive(history, "/signin")}
            >
              Signin
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <Fragment>
          <div>
            <span className="nav-item">
              <Link
                className="nav-link"
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
                to="/signin"
                style={{ cursor: "pointer", color: "white" }}
              >
                Signout
              </Link>
            </span>
          </div>
        </Fragment>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
