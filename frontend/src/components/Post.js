import classes from "./Post.module.css";
import { format } from "date-fns";

function Post({ title, description, username, date }) {
  return (
    <>
      <div className={`card mb-4 ${classes.header}`}>
        <div className="card-body" style={{ width: "100%", marginLeft: "0" }}>
          <h3 className={`card-title ${classes.title}`}>{title}</h3>
          <p className={`card-text ${classes.description}`}>
            {`${description.substring(0, 400)} ${
              description.length > 400 ? "..." : ""
            }`}
            {
              description.length > 400 && <span style={{color:"blue"}}>read more</span>
            }
          </p>
          <p className={`card-text ${classes.details}`}>
            <small className="text-muted">{username}</small>
            <small className="text-muted">
              {format(new Date(date), "d MMM yyyy, HH:mm")}
            </small>
          </p>
        </div>
      </div>
    </>
  );
}

export default Post;
