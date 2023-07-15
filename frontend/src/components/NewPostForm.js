import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";

import classes from "./NewPostForm.module.css";
import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import AuthContext from "../context-api/auth-context";

function NewPostForm({ method, post }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const ctx = useContext(AuthContext);

  console.log("inside NewPostFrom", ctx);
  console.log(post);

  const [checkedValue, setCheckedValue] = useState(false);
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    console.log(ctx.email.trim().length);
    if ((post && post.author.email !== ctx.email)) {
      console.log("inside redirect");
      navigate(-1);
    }
  },[post, ctx, navigate]);
  function cancelHandler() {
    navigate(-1);
  }

  return (
    <>
      {isSubmitting ? (
        <Loader />
      ) : (
        <Form method={method} className={classes.form}>
          {data && data.errors && (
            <ul style={{ paddingLeft: "0px", color: "red" }}>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          <p>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              required
              placeholder="Enter your title"
              defaultValue={post ? post.title : ""}
            />
          </p>
          <p>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              required
              placeholder="Enter your description about the post"
              defaultValue={post ? post.description : ""}
            />
          </p>
          <p className="form-check">
            <input
              style={{ display: "inline", width: "1rem" }}
              className="form-check-input"
              type="checkbox"
              value={checkedValue}
              onClick={() => setCheckedValue((prev) => !prev)}
              id="defaultCheck1"
              name="usernameDisplayStatus"
            />
            <label className="form-check-label" htmlFor="defaultCheck1">
              Do you want to mention your username with the post?
            </label>
          </p>
          <div className={classes.actions}>
            <button
              type="button"
              onClick={cancelHandler}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </Form>
      )}
    </>
  );
}

export default NewPostForm;

export async function action({ request, params }) {
  const method = request.method;
  // console.log(method);
  const data = await request.formData();

  const postData = {
    title: data.get("title"),
    description: data.get("description"),
    usernameDisplayStatus: data.get("usernameDisplayStatus"),
  };
  console.log(postData);

  let url = "https://anonymity-backend.onrender.com/posts";
  if (method === "PATCH") {
    const postId = params.postId;
    console.log(postId);
    url = "https://anonymity-backend.onrender.com/posts/" + postId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
    credentials: "include",
  });

  if (response.status === 422) return response;

  if (response.status !== 200)
    throw json({ message: "Could not save post." }, { status: 500 });
  else return redirect("/posts");
}
