import { Link, useSubmit } from "react-router-dom";

import classes from "./PostItem.module.css";
import { format } from "date-fns";
import { useContext } from "react";
import AuthContext from "../context-api/auth-context";

function PostItem({ post }) {
  const submit = useSubmit();
  const ctx = useContext(AuthContext);
  // submit({//form data if any}, {method:"delete", action:"/a-different-path-action"});

  // console.log(ctx);

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure yow want to delete?");
    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  }

  return (
    <div className={`container ${classes.post}`}>
      {/* <img src={post.image} alt={post.title} /> */}
      <h1>{post.title}</h1>
      <p className={classes.author}>{post.author ? post.author.username : "unknown"}</p>
      <time>{format(new Date(post.createdAt), "d MMM yyyy, HH:mm")}</time>
      <p className={classes.description}>{post.description}</p>

      {ctx.email === (post.author ? post.author.email : "") && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </div>
  );
}

export default PostItem;
