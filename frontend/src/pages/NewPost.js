import NewPostForm from "../components/NewPostForm";

function NewPostPage() {
  return <NewPostForm method="POST"/>;
}

export default NewPostPage;

// export async function action({ request }) {
//   const data = await request.formData();
//   console.log(request);

//   const postData = {
//     title: data.get("title"),
//     description: data.get("description"),
//   };

//   const response = await fetch("http://localhost:5000/posts", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(postData),
//     credentials: "include",
//   });

//   if (response.status === 422) return response;

//   if (response.status !== 200)
//     throw json({ message: "Could not save post." }, { status: 500 });
//   else return redirect("/posts");
// }
