import { Link } from "react-router-dom";
import Post from "./Post";
import classes from "./PostList.module.css";

function PostsList({ posts }) {
  return (
    <div className={classes.posts}>
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                to={`/posts/${post._id}`}
                style={{ textDecoration: "none" }}
              >
                <Post
                  key={post._id}
                  title={post.title}
                  description={post.description}
                  username={
                    post.usernameDisplayStatus
                      ? post.author
                        ? post.author.username
                        : "Unknown"
                      : "Unknown"
                  }
                  date={post.createdAt}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostsList;
