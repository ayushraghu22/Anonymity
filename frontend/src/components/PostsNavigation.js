import { NavLink } from "react-router-dom";

import classes from "./PostsNavigation.module.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function PostsNavigation() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  let sid = Cookies.get("connect.sid") || undefined;

  useEffect(() => {
    if (sid) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, [sid]);

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Posts
            </NavLink>
          </li>
          {IsLoggedIn && (
            <li>
              <NavLink
                to="/posts/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New Post
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default PostsNavigation;
