import { useRouteLoaderData, Await } from "react-router-dom";
import NewPostForm from "../components/NewPostForm";
import { Suspense } from "react";
import Loader from "../components/Loader";

function EditPostPage() {
  // return <NewPostForm post={data.foundUser} method="PATCH"/>;

  const { foundUser } = useRouteLoaderData("post-detail");

  // return <PostItem post={data.foundUser} />;
  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={foundUser}>
        {(loadedPost) => <NewPostForm post={loadedPost} method="PATCH" />}
      </Await>
    </Suspense>
  );
}

export default EditPostPage;
