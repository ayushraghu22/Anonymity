import { Await, json, redirect, useRouteLoaderData, defer } from "react-router-dom";
import PostItem from "../components/PostItem";
import { Suspense } from "react";
import Loader from "../components/Loader";

function PostDetailPage() {
  const { foundUser } = useRouteLoaderData("post-detail");

  // return <PostItem post={data.foundUser} />;
  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={foundUser}>
        {(loadedPost) => <PostItem post={loadedPost} />}
      </Await>
    </Suspense>
  );
}

export default PostDetailPage;

async function loadEvents(params) {
  const postId = params.postId;

  const response = await fetch("https://anonymity-backend.onrender.com/posts/" + postId, {
    method: "get",
    credentials: "include",
  });

  if (response.status !== 200) {
    throw json(
      { message: "Could not fetch the required post page." },
      { status: 500 }
    );
  } else{ 
    // return await response.json().foundUser;
    const resData = await response.json();
    return resData.foundUser;
  }
}

export function loader({ params }) {
  return defer({
    foundUser: loadEvents(params),
  });
}

export async function action({ params, request }) {
  const postId = params.postId;

  const url = "https://anonymity-backend.onrender.com/posts/" + postId;
  const response = await fetch(url, {
    method: request.method,
    credentials: "include",
  });

  if (response.status !== 200) {
    throw json({ message: "Could not delete the post." }, { status: 500 });
  } else return redirect("/posts");
}
