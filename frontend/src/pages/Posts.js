import { Await, json, useLoaderData, defer } from "react-router-dom";
import PostsList from "../components/PostsList";
import { Suspense } from "react";
import Loader from "../components/Loader";

function PostsPage() {
  const { foundUsers } = useLoaderData();

  // return <PostsList posts={posts} />;
  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={foundUsers}>
        {(loadedPosts) => <PostsList posts={loadedPosts} />}
      </Await>
    </Suspense>
  );
}

export default PostsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:5000/posts", {
    method: "get",
    credentials: "include",
  });

  if (response.status !== 200) {
    throw json(
      { message: "Could not fetch posts." },
      { status: response.status }
    );
  } else {
    const resData = await response.json();
    return resData.foundUsers;
  }
}

export function loader() {
  return defer({
    foundUsers: loadEvents(),
  });
}
